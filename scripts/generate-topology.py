#!/usr/bin/env python3
"""Derive a public-source snapshot. No repository code is executed or cached verbatim."""
from __future__ import annotations
import argparse
import ast
import concurrent.futures
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import sys
from datetime import datetime, timezone
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'data/topology-cache'
DEST = ROOT / 'src/topology/data.json'
VERSION = 1
PARSER_VERSION = 3
MAX_BYTES = 250_000
REPOS = [
    dict(id='poly', title='Poly Predictor Kit', owner='raimbekalish', repo='Poly_Predictor_Kit', ownership='team', summary='Prediction-market analysis across event data, market signals, and community comments.', contribution='Built the market-summary and comment-classification pipelines within the team project.'),
    dict(id='promptlock', title='PromptLock', owner='abdirahmanbm01', repo='nexhacks', ownership='team', summary='Task-aware context compression for logs, diffs, documentation, and API payloads.', contribution='Contributed task-aware compression modes for debugging, code review, builds, and documentation with a FastAPI backend and token-based chunking.'),
    dict(id='jiragenie', title='JiraGenie', owner='khyeo1011', repo='dubhacks25', ownership='team', summary='A voice-enabled assistant for querying, analyzing, and summarizing Jira issues.', contribution='Contributed the ElevenLabs streaming speech-to-text integration and microphone interface for a natural-language Jira assistant.'),
    dict(id='novel', title='AI Visual Novel Creator', owner='Vimpel-O-O', repo='AI_Visual_Novel_Creator', ownership='team', summary='A pipeline that turns generated story data and visual assets into a playable Ren’Py project.', contribution='Built the Python content pipeline that transformed generated story data into game-ready Ren’Py files and integrated Stability AI scene-image generation.'),
    dict(id='portfolio', title='Portfolio', owner='raimbekalish', repo='portfolio', ownership='personal', summary='The public source repository for this portfolio.', contribution='Personal engineering portfolio.'),
]
LANGUAGES = {'.py':'Python', '.js':'JavaScript', '.jsx':'JavaScript', '.mjs':'JavaScript', '.cjs':'JavaScript', '.ts':'TypeScript', '.tsx':'TypeScript', '.css':'CSS', '.scss':'SCSS', '.html':'HTML', '.vue':'Vue', '.svelte':'Svelte'}
# Denied names are checked before extension allowlists. No env example is an exception.
DENY_SEGMENTS = {'node_modules','vendor','vendors','venv','.venv','env','.env','__pycache__','.git','.next','.nuxt','dist','build','coverage','out','output','target','.cache','uploads','upload','private','secrets','credentials','data','datasets','database','databases','generated','site-packages','migrations','renpy','sdk','log','logs','backups'}
DENY_NAME = re.compile(r'(?:^\.?env(?:[._-]|$)|secret|credential|private[-_]?key|(?:^|[-_.])token(?:[-_.]|$)|\.min\.|\.d\.ts$|lock\.(?:json|ya?ml)$)', re.I)
MANIFEST_NAME = re.compile(r'^(?:package\.json|pyproject\.toml|requirements(?:[-_.][A-Za-z0-9_-]+)?\.txt)$', re.I)
JS_EXTENSIONS = ('.ts','.tsx','.js','.jsx','.mjs','.cjs','.vue','.svelte','.css','.scss','.html')


def timestamp():
    return datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00','Z')


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n')


def read_json(path):
    return json.loads(path.read_text())


def get(url):
    # Explicit anonymous request. No environment tokens, Git config, or credential helpers.
    request = urllib.request.Request(url, headers={'User-Agent':'Raimbek-Public-Code-Topology/1', 'Accept':'application/vnd.github+json'})
    with urllib.request.urlopen(request, timeout=35) as response:
        data = response.read(MAX_BYTES * 40 + 1)
        if len(data) > MAX_BYTES * 40:
            raise ValueError('response-size-limit')
        return data


def api(endpoint):
    return json.loads(get('https://api.github.com/' + endpoint))


def allowed(path):
    parts = PurePosixPath(path).parts
    if not parts or any(p.lower() in DENY_SEGMENTS for p in parts):
        return False
    if any(DENY_NAME.search(p) for p in parts):
        return False
    # Ignore dot directories other than the explicit source-like .github scripts.
    if any(p.startswith('.') and p != '.github' for p in parts[:-1]):
        return False
    return True


def file_type(path):
    if not allowed(path):
        return None
    name = PurePosixPath(path).name
    if re.search(r'r[eé]sum[eé]|curriculum[-_ ]?vitae', name, re.I):
        return None
    if MANIFEST_NAME.match(name):
        return 'manifest'
    return LANGUAGES.get(PurePosixPath(path).suffix.lower())


def prepare_repo(repo, refresh=False):
    key = f"{repo['owner']}/{repo['repo']}"
    meta = api('repos/' + key)
    if meta.get('private') is not False or meta.get('visibility') != 'public':
        raise ValueError('repository-not-confirmed-public')
    directory = CACHE / repo['id']
    manifest_path = directory / 'provenance.json'
    if manifest_path.exists() and not refresh:
        provenance = read_json(manifest_path)
        # Repeat public verification before any online source request.
        provenance['lastPublicVerification'] = timestamp()
        write_json(manifest_path, provenance)
        tree = read_json(directory / 'tree.json')
        tree['files'] = [item for item in tree['files'] if file_type(item['path']) is not None]
        provenance['eligibleSourceFiles'] = sum(item['type'] != 'manifest' for item in tree['files'])
        provenance['eligibleManifests'] = sum(item['type'] == 'manifest' for item in tree['files'])
        provenance['excludedBlobs'] = provenance['totalTreeBlobs'] - len(tree['files'])
        write_json(directory / 'tree.json', tree)
        write_json(manifest_path, provenance)
        return provenance, tree
    branch = meta['default_branch']
    commit = api(f'repos/{key}/commits/{urllib.parse.quote(branch, safe="")}')
    tree = api(f"repos/{key}/git/trees/{commit['commit']['tree']['sha']}?recursive=1")
    if tree.get('truncated'):
        raise ValueError('github-tree-truncated')
    blobs = [item for item in tree['tree'] if item.get('type') == 'blob']
    eligible = []
    for item in blobs:
        kind = file_type(item['path'])
        if kind is not None and item.get('mode') != '120000':
            eligible.append({'path':item['path'], 'sha':item['sha'], 'bytes':item.get('size',0), 'type':kind})
    eligible.sort(key=lambda item:item['path'])
    now = timestamp()
    provenance = {
        'schemaVersion':VERSION,
        'repository':key,
        'repositoryUrl':meta['html_url'],
        'public':True,
        'visibility':'public',
        'publicVerificationUrl':'https://api.github.com/repos/' + key,
        'verifiedAt':now,
        'lastPublicVerification':now,
        'commit':commit['sha'],
        'committedAt':commit['commit']['committer']['date'],
        'tree':commit['commit']['tree']['sha'],
        'defaultBranchAtVerification':branch,
        'sourceTreeUrl':f"https://api.github.com/repos/{key}/git/trees/{commit['commit']['tree']['sha']}?recursive=1",
        'totalTreeBlobs':len(blobs),
        'eligibleSourceFiles':sum(item['type'] != 'manifest' for item in eligible),
        'eligibleManifests':sum(item['type'] == 'manifest' for item in eligible),
        'excludedBlobs':len(blobs)-len(eligible),
        'treeTruncated':False,
    }
    write_json(manifest_path,provenance)
    write_json(directory / 'tree.json', {'commit':commit['sha'], 'files':eligible})
    print(f"TREE {repo['id']}: {provenance['eligibleSourceFiles']} source files, {provenance['eligibleManifests']} manifests, commit {commit['sha'][:12]}",flush=True)
    return provenance, {'commit':commit['sha'], 'files':eligible}


def strip_js_comments(code):
    # Preserve quoted strings so // in a specifier is not mistaken for a comment.
    token = re.compile(r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`)|//[^\n]*|/\*[\s\S]*?\*/')
    return token.sub(lambda m: m.group(1) or ' ' * len(m.group(0)), code)


def import_references(path, code):
    if path.endswith('.py'):
        try:
            module = ast.parse(code)
        except SyntaxError:
            return [], 'python-syntax-unparsed'
        refs=[]
        for node in ast.walk(module):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    refs.append({'syntax':'python', 'module':alias.name,'level':0,'names':[]})
            elif isinstance(node, ast.ImportFrom):
                refs.append({'syntax':'python','module':node.module or '', 'level':node.level,'names':[alias.name for alias in node.names if alias.name != '*']})
        return refs, None
    if PurePosixPath(path).suffix in JS_EXTENSIONS:
        code = strip_js_comments(code)
        # Import-like example strings are not source declarations. Preserve offsets while
        # rejecting keyword matches inside any quoted/template literal.
        quoted = re.compile(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`')
        literal_ranges = [match.span() for match in quoted.finditer(code)]
        specs=set()
        patterns = [
            r'(?<![\w$.])(?:import|export)\s+(?:type\s+)?(?:[^;\'"()]*?\bfrom\s*)?[\'"](\.{1,2}/[^\'"\n]+)[\'"]',
            r'(?<![\w$.])(?:import|require)\s*\(\s*[\'"](\.{1,2}/[^\'"\n]+)[\'"]\s*\)',
        ]
        for pattern in patterns:
            for match in re.finditer(pattern,code):
                if not any(a <= match.start() < b for a,b in literal_ranges):
                    specs.add(match.group(1))
        return [{'syntax':'javascript-relative','specifier':specifier} for specifier in sorted(specs)], None
    return [], None


def dependency_names(path, code):
    found=[]
    name=PurePosixPath(path).name.lower()
    if name == 'package.json':
        try:
            obj=json.loads(code)
            for field,kind in [('dependencies','runtime'),('devDependencies','development'),('peerDependencies','peer'),('optionalDependencies','optional')]:
                for key in obj.get(field,{}):
                    if re.fullmatch(r'(?:@[A-Za-z0-9._-]+/)?[A-Za-z0-9._-]+',key):
                        found.append({'name':key,'manifest':path,'kind':kind})
        except (ValueError,AttributeError):
            pass
    elif name.startswith('requirements'):
        for line in code.splitlines():
            line=line.strip()
            if not line or line.startswith(('#','-')) or '://' in line or '@' in line:
                continue
            match=re.match(r'^([A-Za-z0-9][A-Za-z0-9_.-]*)(?:\[[^\]]+\])?(?:\s*[<>=!~;]|\s*$)',line)
            if match:
                found.append({'name':match.group(1),'manifest':path,'kind':'python-requirement'})
    elif name == 'pyproject.toml':
        try:
            import tomllib
            obj=tomllib.loads(code)
            for dep in obj.get('project',{}).get('dependencies',[]):
                match=re.match(r'^([A-Za-z0-9][A-Za-z0-9_.-]*)',dep)
                if match:found.append({'name':match.group(1),'manifest':path,'kind':'python-requirement'})
            for dep in obj.get('tool',{}).get('poetry',{}).get('dependencies',{}):
                if dep != 'python' and re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_.-]*',dep):
                    found.append({'name':dep,'manifest':path,'kind':'python-requirement'})
        except (ImportError,ValueError,AttributeError):
            pass
    return sorted(found,key=lambda dep:(dep['name'],dep['kind']))


def read_source(repo, provenance, item):
    path=item['path']
    result={'path':path, 'blobSha':item['sha'], 'bytes':item['bytes'], 'type':item['type']}
    if item['bytes'] > MAX_BYTES:
        return {**result,'status':'skipped-size-limit','imports':[], 'dependencies':[]}
    url=f"https://raw.githubusercontent.com/{repo['owner']}/{repo['repo']}/{provenance['commit']}/{urllib.parse.quote(path,safe='/')}"
    try:
        raw=get(url)
        if len(raw)>MAX_BYTES:
            return {**result,'status':'skipped-size-limit','imports':[],'dependencies':[]}
        # Blob verification makes the public tree SHA and the bytes read mutually checkable.
        blob=hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
        if blob != item['sha']:
            raise ValueError('blob-hash-mismatch')
        code=raw.decode('utf-8-sig')
        refs,warning=import_references(path,code) if item['type'] != 'manifest' else ([],None)
        return {**result,'status':'read','sha256':hashlib.sha256(raw).hexdigest(),'sourceUrl':url,'imports':refs,'dependencies':dependency_names(path,code) if item['type']=='manifest' else [],'parseWarning':warning}
    except (urllib.error.URLError,UnicodeError,ValueError) as exc:
        # No exception body/source content is printed or cached.
        return {**result,'status':'unreadable','errorType':type(exc).__name__,'imports':[],'dependencies':[]}


def normalized(path):
    parts=[]
    for bit in path.split('/'):
        if bit in ('','.'):
            continue
        if bit == '..':
            if not parts:return None
            parts.pop()
        else:parts.append(bit)
    return '/'.join(parts)


def resolve_edges(files, records):
    source_paths={file['path'] for file in files}
    edges=set()
    def candidate(base, language):
        if base is None:return None
        choices=[base]
        if language == 'python':
            choices=[base+'.py',base+'/__init__.py']
        elif not PurePosixPath(base).suffix:
            choices += [base+extension for extension in JS_EXTENSIONS]
            choices += [base+'/index'+extension for extension in JS_EXTENSIONS]
        for choice in choices:
            if choice in source_paths:return choice
        return None
    for record in records:
        source=record['path']
        if source not in source_paths:continue
        for ref in record.get('imports',[]):
            if ref['syntax']=='javascript-relative':
                # Query strings identify assets/transforms, not the code module edge used here.
                spec=ref['specifier'].split('?')[0].split('#')[0]
                target=candidate(normalized(str(PurePosixPath(source).parent)+'/'+spec),'javascript')
                if target and target!=source:edges.add((source,target,'relative-import'))
            else:
                level=ref['level']
                module=ref['module'].replace('.','/')
                if level:
                    parent=list(PurePosixPath(source).parent.parts)
                    if parent==['.']:parent=[]
                    if level-1>len(parent):continue
                    if level>1:parent=parent[:-(level-1)]
                    prefix='/'.join(parent)
                    bases=[normalized((prefix+'/' if prefix else '')+module)]
                    kind='relative-import'
                else:
                    # Root-local and sibling-local only; no sys.path/runtime/alias inference.
                    bases=[normalized(module),normalized(str(PurePosixPath(source).parent)+'/'+module)]
                    kind='local-import'
                for base in bases:
                    targets=[]
                    resolved=candidate(base,'python')
                    if resolved:targets.append(resolved)
                    for child in ref['names']:
                        resolved_child=candidate(normalized((base+'/' if base else '')+child),'python')
                        if resolved_child:targets.append(resolved_child)
                    if targets:
                        for target in targets:
                            if target != source:edges.add((source,target,kind))
                        break
    return [{'source':s,'target':t,'kind':k} for s,t,k in sorted(edges)]


def groups_for(files):
    groups={'.':{'id':'.','path':'.','parent':None,'fileCount':0,'ownFileCount':0,'languages':{}}}
    for file in files:
        parent=PurePosixPath(file['path']).parent
        file['group']=str(parent)
        paths=['.']+['/'.join(parent.parts[:i]) for i in range(1,len(parent.parts)+1)] if str(parent)!='.' else ['.']
        for path in paths:
            if path not in groups:
                ancestor=str(PurePosixPath(path).parent)
                groups[path]={'id':path,'path':path,'parent':ancestor,'fileCount':0,'ownFileCount':0,'languages':{}}
            group=groups[path]
            group['fileCount']+=1
            group['ownFileCount']+=int(str(parent)==path)
            lang=file['language']
            group['languages'][lang]=group['languages'].get(lang,0)+1
    return [groups[key] for key in sorted(groups)]


def derive(repo, provenance, tree, records):
    files=[{'path':item['path'],'language':item['type'],'bytes':item['bytes']} for item in tree['files'] if item['type']!='manifest']
    groups=groups_for(files)
    edges=resolve_edges(files,records)
    counts={}
    for file in files:counts[file['language']]=counts.get(file['language'],0)+1
    counts=dict(sorted(counts.items(),key=lambda pair:(-pair[1],pair[0])))
    dependencies=[dep for record in records for dep in record.get('dependencies',[])]
    dependencies.sort(key=lambda dep:(dep['manifest'],dep['name'],dep['kind']))
    top_dirs=[group for group in groups if group['parent']=='.']
    top_dirs.sort(key=lambda group:(-group['fileCount'],group['path']))
    highlights=[f"{len(files)} allowlisted source files across {len(counts)} languages in this pinned snapshot.",f"{len(edges)} statically resolved local import relationships; this is not a call graph."]
    if top_dirs:
        highlights.append('Largest top-level source groups: '+', '.join(f"{g['path']} ({g['fileCount']} files)" for g in top_dirs[:3])+'.')
    else:highlights.append('The included source files sit at the repository root.')
    return {**repo,'url':provenance['repositoryUrl'],'commit':provenance['commit'],'public':True,'publicVerifiedAt':provenance['verifiedAt'],'languageCounts':counts,'files':files,'groups':groups,'edges':edges,'dependencies':dependencies,'structuralHighlights':highlights,'treeStats':{'totalTreeBlobs':provenance['totalTreeBlobs'],'sourceFiles':len(files),'directoryGroups':len(groups),'manifestFiles':provenance['eligibleManifests'],'excludedBlobs':provenance['excludedBlobs'],'readFiles':sum(r['status']=='read' for r in records),'unreadableFiles':sum(r['status']=='unreadable' for r in records),'oversizedFiles':sum(r['status']=='skipped-size-limit' for r in records),'parseWarnings':sum(bool(r.get('parseWarning')) for r in records)}}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--offline',action='store_true',help='Rebuild only from checked-in metadata and derived-import caches, with no network.')
    parser.add_argument('--refresh',action='store_true',help='Online only: replace pinned commits with current public default-branch heads.')
    parser.add_argument('--trees-only',action='store_true',help='Verify visibility and pin filtered tree metadata, without reading source.')
    args=parser.parse_args()
    if args.offline and args.refresh:parser.error('--offline cannot be combined with --refresh')
    CACHE.mkdir(parents=True,exist_ok=True)
    snapshot_path=CACHE/'snapshot.json'
    snapshot=read_json(snapshot_path) if snapshot_path.exists() and not args.refresh else {'schemaVersion':VERSION,'generatedAt':timestamp()}
    write_json(snapshot_path,snapshot)
    prepared=[]
    rejected=[]
    for repo in REPOS:
        directory=CACHE/repo['id']
        try:
            if args.offline:
                provenance=read_json(directory/'provenance.json');tree=read_json(directory/'tree.json')
            else:
                provenance,tree=prepare_repo(repo,args.refresh)
            prepared.append((repo,provenance,tree))
        except (urllib.error.URLError,ValueError,FileNotFoundError) as exc:
            rejected.append({'url':f"https://github.com/{repo['owner']}/{repo['repo']}",'reason':str(exc) if isinstance(exc,ValueError) else type(exc).__name__})
            print(f"REJECTED {repo['id']}: {rejected[-1]['reason']}",flush=True)
    if args.trees_only:
        return
    result=[]
    for repo,provenance,tree in prepared:
        cache_path=CACHE/repo['id']/'derived-imports.json'
        cached=read_json(cache_path) if cache_path.exists() else None
        if cached and cached.get('commit')==provenance['commit'] and cached.get('parserVersion')==PARSER_VERSION:
            records=cached['records']
        elif args.offline:
            raise SystemExit(f"Offline cache missing for {repo['id']}; no network fallback was attempted.")
        else:
            with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
                records=list(pool.map(lambda item:read_source(repo,provenance,item),tree['files']))
            write_json(cache_path,{'parserVersion':PARSER_VERSION,'commit':provenance['commit'],'policy':'No raw source content stored. Only hashes, public file URLs, import specifiers, dependency names and parse status.','records':records})
        item=derive(repo,provenance,tree,records)
        result.append(item)
        print(f"DATA {repo['id']}: {len(item['files'])} files / {len(item['groups'])} groups / {len(item['edges'])} imports / {len(item['dependencies'])} declared dependencies",flush=True)
    dataset={'schemaVersion':VERSION,'generatedAt':snapshot['generatedAt'],'repositories':result,'rejected':rejected,'method':{'scope':'Anonymous, public GitHub source snapshots only. R-Finance internal work is excluded.','provenance':'Public visibility verified before source access; tree and every source fetch pinned to the recorded commit. Source blob SHA-1 verified before parsing.','hierarchy':'All allowlisted source files in the complete, nontruncated Git tree. Directory groups contain recursive file counts and direct ownFileCount. languageCounts counts files, not lines or bytes.','imports':'Python AST import declarations and static JavaScript/TypeScript relative literal imports, including type imports and literal import() declarations. Only targets resolving to an included source file are emitted. Python root/sibling module resolution is conservative, without runtime sys.path inference.','edgeMeaning':'Import relationships only; not runtime requests, call graphs, architecture ownership, or shared systems between repositories.','limitations':['No TypeScript path aliases, bundler plugins, computed imports, dynamic Python imports, runtime calls or cross-repository edges.','Tree counts describe the filtered public snapshot, not authored work, accomplishments, production scale, or code quality.','Team repositories contain the entire public team source; the graph does not assign file authorship to Raimbek.','Python files that cannot be parsed are retained as hierarchy nodes but add no import edges.','The denylist intentionally excludes environment, secrets, credential-like paths, user/data storage, résumé-named files, dependencies, build output, Ren’Py generated/template output, and files larger than 250 KB from content fetching.'],'sourceExtensions':sorted(LANGUAGES),'maxSourceBytes':MAX_BYTES,'cache':'Derived metadata only; raw source bodies are discarded after parsing. Offline replay uses the same pinned cache and generatedAt.'}}
    write_json(DEST,dataset)
    print(f"WROTE {DEST.relative_to(ROOT)} ({DEST.stat().st_size} bytes)",flush=True)

if __name__=='__main__':
    main()
