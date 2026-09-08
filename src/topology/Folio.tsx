import type { CSSProperties } from 'react';
import type { DrawingProps, Point, Repository } from './types';
import { inkFor } from './types';
import { fileWidth, nameOf, sourceSheets, focusEdges } from './model';

function ProjectFolio({repo,index,selected,entered}: {repo:Repository;index:number;selected:number|null;entered:boolean}) {
  const sheets=sourceSheets(repo);
  const files=sheets.flatMap(sheet=>sheet.files);
  const active=selected===index;
  const anchors=[[112,224],[414,250],[1015,242],[1120,492],[520,490]];
  const [ax,ay]=anchors[index%anchors.length];
  const graphEdges=entered&&active?focusEdges(repo):repo.edges;
  const focusPaths=new Set(graphEdges.flatMap(edge=>[edge.source,edge.target]));
  const focusFiles=files.filter(file=>focusPaths.has(file.path));
  const count=entered&&active?focusFiles.length:files.length;
  const columns=entered?2:Math.max(2,Math.ceil(Math.sqrt(count)));
  const cellWidth=entered?255:120;
  const cellHeight=entered?92:64;
  const flatWidth=columns*cellWidth;
  const flatHeight=Math.ceil(count/columns)*cellHeight;
  const size=entered?Math.min(1.1,680/flatWidth,420/flatHeight):Math.min(1.35,680/flatWidth,420/flatHeight);
  const parent:CSSProperties={transform:active?'translate(520px,75px) scale('+size+')':'translate('+ax+'px,'+ay+'px)',opacity:selected===null||active?1:0,transition:'transform 900ms cubic-bezier(.18,.8,.18,1),opacity 420ms'};
  const points=new Map<string,Point>();
  const positions=files.map((file,i)=>{
    const groupIndex=sheets.findIndex(sheet=>sheet.path===(file.path.includes('/')?file.path.slice(0,file.path.lastIndexOf('/')):'.'));
    const depth=file.path.split('/').length-1;
    const flatIndex=entered?focusFiles.indexOf(file):i;
    const x=active?(Math.max(0,flatIndex)%columns)*cellWidth:i*9.5+groupIndex*8;
    const y=active?Math.floor(Math.max(0,flatIndex)/columns)*cellHeight:i*1.5+depth*11;
    points.set(file.path,{x:x+(entered?105:45),y:y+(active?23:-40)});
    return {file,x,y,visible:!entered||!active||focusPaths.has(file.path)};
  });
  return <g style={parent} className="tp-folio-cluster">
    <text className="tp-cluster-title" x="0" y={active?-27:-142} fill="#e7e4d9" fontSize={active?18:16} fontFamily="Manrope,sans-serif">{String(index+1).padStart(2,'0')} / {repo.title}</text>
    <g fill="none" stroke="#aad5b9" strokeWidth={active?1.25:.75} opacity={active?.65:.4}>
      {graphEdges.map((edge,i)=>{const a=points.get(edge.source),b=points.get(edge.target);if(!a||!b)return null;const path='M'+a.x+' '+a.y+'C'+(a.x-45)+' '+(a.y-40)+','+(b.x-45)+' '+(b.y-40)+','+b.x+' '+b.y;return <path key={edge.source+edge.target+i} d={path} style={{d:'path(\"'+path+'\")',transition:'d 900ms cubic-bezier(.18,.8,.18,1)'}}/>;})}
    </g>
    {positions.map(({file,x,y,visible})=>{
      const w=entered&&active?230:100;
      const h=entered&&active?70:51;
      const tone=inkFor(file.language);
      const style:CSSProperties={transform:active?'translate('+x+'px,'+y+'px)':'translate('+x+'px,'+y+'px) matrix(.38,-.25,.32,1,0,-106)',opacity:visible?1:0,transition:'transform 900ms cubic-bezier(.18,.8,.18,1),opacity 300ms'};
      return <g key={file.path} style={style}>
        <path d={'M0 5H'+w+'V'+(h+5)+'H0Z'} fill="#435d50"/>
        <path d={'M0 0H'+w+'V'+h+'H0Z'} fill={active?'#203b2c':tone} stroke={active?'#789984':'#d7e3d1'} strokeWidth=".6"/>
        <path d={'M8 '+(h-9)+'h'+Math.min(w-16,fileWidth(file.bytes))} stroke={active?tone:'#315b44'} strokeWidth={active?3:2}/>
        {active&&entered&&<><text x="9" y="18" fill="#e4e9d8" fontSize={entered?13:8} fontFamily="Manrope,sans-serif">{nameOf(file.path).length>(entered?29:20)?nameOf(file.path).slice(0,entered?28:19)+'…':nameOf(file.path)}</text><text x="9" y={entered?38:31} fill="#a3bda8" fontSize={entered?9:6} fontFamily="ui-monospace,monospace">{entered?file.path.length>38?'…'+file.path.slice(-37):file.path:file.language}</text></>}
      </g>;
    })}
    {!active&&<text x="0" y={files.length*1.5+14} fill="#c1cfc3" fontSize="10" fontFamily="ui-monospace,monospace">{repo.files.length} files / {sheets.length} source {sheets.length===1?"directory":"directories"}</text>}
    {active&&!entered&&<g>{sheets.slice(0,4).map((sheet,j)=><text key={sheet.path} x="0" y={flatHeight+24+j*19} fill="#bcd1b7" fontSize="12" fontFamily="ui-monospace,monospace">{sheet.path+" / "+sheet.files.length+(sheet.files.length===1?" file":" files")}</text>)}</g>}
    {active&&entered&&<text x="0" y={flatHeight+27} fill="#bbd4ba" fontSize="11" fontFamily="ui-monospace,monospace">Selected import neighborhood / {graphEdges.length} resolved relationships</text>}
  </g>;
}
export default function Folio({repositories,selected,entered}:DrawingProps) {
  return <g>{repositories.map((repo,i)=><ProjectFolio key={repo.id} repo={repo} index={i} selected={selected} entered={entered}/>)}</g>;
}
