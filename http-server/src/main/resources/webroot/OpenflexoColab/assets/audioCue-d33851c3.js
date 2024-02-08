import{ak as I,B as o,pO as k,bz as O,bM as M,bN as B,pP as C,av as N,bj as H,_ as S,a as b,pQ as L,D as A,pb as m,pR as T,t as W,cx as $,e as q,aQ as R,k5 as z,w as Q,kn as E,pS as j,pT as _,iM as K,cF as U,p7 as G,pU as X,pV as Y,pW as Z,a2 as J,pX as V,pY as ee,pZ as ie,a3 as P,iB as x,cA as se,aj as ae,k as te,p_ as oe}from"./index-e8d740ba.js";import{r as ne}from"./assets-28e9249d.js";const re="/OpenflexoColab/assets/break-6b46c048.mp3",de="/OpenflexoColab/assets/diffLineDeleted-576ba12f.mp3",ue="/OpenflexoColab/assets/diffLineInserted-a5aae8f0.mp3",le="/OpenflexoColab/assets/diffLineModified-314716c3.mp3",ce="/OpenflexoColab/assets/error-b93c2a76.mp3",pe="/OpenflexoColab/assets/foldedAreas-a6b54171.mp3",be="/OpenflexoColab/assets/quickFixes-dc7d1e73.mp3",Ce="/OpenflexoColab/assets/taskCompleted-f0dd8e18.mp3",he="/OpenflexoColab/assets/taskFailed-5494702a.mp3",me="/OpenflexoColab/assets/terminalBell-ff9df1e1.mp3",fe="/OpenflexoColab/assets/warning-2687e2e7.mp3",ge=Object.freeze(Object.defineProperty({__proto__:null,vs_platform_audioCues_browser_media_break_mp3:re,vs_platform_audioCues_browser_media_diffLineDeleted_mp3:de,vs_platform_audioCues_browser_media_diffLineInserted_mp3:ue,vs_platform_audioCues_browser_media_diffLineModified_mp3:le,vs_platform_audioCues_browser_media_error_mp3:ce,vs_platform_audioCues_browser_media_foldedAreas_mp3:pe,vs_platform_audioCues_browser_media_quickFixes_mp3:be,vs_platform_audioCues_browser_media_taskCompleted_mp3:Ce,vs_platform_audioCues_browser_media_taskFailed_mp3:he,vs_platform_audioCues_browser_media_terminalBell_mp3:me,vs_platform_audioCues_browser_media_warning_mp3:fe},Symbol.toStringTag,{value:"Module"}));class y extends I{constructor(){super({id:y.ID,title:{value:o("audioCues.help","Help: List Audio Cues"),original:"Help: List Audio Cues"},f1:!0})}async run(t){const r=t.get(k),e=t.get(O),u=t.get(M),l=t.get(B),n=C.allAudioCues.map((s,a)=>({label:l.isScreenReaderOptimized()?`${s.name}${r.isEnabled(s)?"":" ("+o("disabled","Disabled")+")"}`:`${r.isEnabled(s)?"$(check)":"     "} ${s.name}`,audioCue:s,buttons:[{iconClass:N.asClassName(H.settingsGear),tooltip:o("audioCues.help.settings","Enable/Disable Audio Cue")}]}));await e.pick(n,{activeItem:n[0],onDidFocus:s=>{r.playSound(s.audioCue.sound,!0)},onDidTriggerItemButton:s=>{u.openSettings({query:s.item.audioCue.settingsKey})},placeHolder:o("audioCues.help.placeholder","Select an audio cue to play")})}}y.ID="audioCues.help";let w=class extends A{constructor(t,r){super(),this.audioCueService=r;const e=m(r.onEnabledChanged(C.onDebugBreak),()=>r.isEnabled(C.onDebugBreak));this._register(T((u,l)=>{if(!e.read(u))return;const n=new Map;l.add(W(()=>{n.forEach(i=>i.dispose()),n.clear()})),l.add(t.onDidNewSession(i=>n.set(i,this.handleSession(i)))),l.add(t.onDidEndSession(i=>{var s;(s=n.get(i))==null||s.dispose(),n.delete(i)})),t.getModel().getSessions().forEach(i=>n.set(i,this.handleSession(i)))},"subscribe to debug sessions"))}handleSession(t){return t.onDidChangeState(r=>{const e=t.getStoppedDetails(),u="breakpoint";e&&e.reason===u&&this.audioCueService.playAudioCue(C.onDebugBreak)})}};w=S([b(0,L),b(1,k)],w);let F=class extends A{constructor(t,r,e,u){super(),this.editorService=t,this.instantiationService=r,this.audioCueService=e,this._configurationService=u,this.store=this._register(new Q),this.features=[this.instantiationService.createInstance(v,C.error,E.Error),this.instantiationService.createInstance(v,C.warning,E.Warning),this.instantiationService.createInstance(_e),this.instantiationService.createInstance(D)],this.isEnabledCache=new j(i=>m(this.audioCueService.onEnabledChanged(i),()=>this.audioCueService.isEnabled(i)));const l=_("someAudioCueFeatureIsEnabled",i=>this.features.some(s=>this.isEnabledCache.get(s.audioCue).read(i))),n=m(this.editorService.onDidActiveEditorChange,i=>{const s=this.editorService.activeTextEditorControl,a=K(s)?s.getOriginalEditor():U(s)?s:void 0;return a&&a.hasModel()?{editor:a,model:a.getModel()}:void 0});this._register(G("updateAudioCuesEnabled",i=>{if(this.store.clear(),!l.read(i))return;const s=n.read(i);s&&this.registerAudioCuesForEditor(s.editor,s.model,this.store)}))}registerAudioCuesForEditor(t,r,e){const u=m(t.onDidChangeCursorPosition,a=>{if(!(a&&a.reason!==3&&a.reason!==0))return t.getPosition()}),l=X(u,this._configurationService.getValue("audioCues.debouncePositionChanges")?300:0,e),n=Y(r.onDidChangeContent.bind(r),1e3,e),i=this.features.map(a=>{const p=a.getObservableState(t,r),h=_(`isPresentInLine:${a.audioCue.name}`,c=>{if(!this.isEnabledCache.get(a.audioCue).read(c))return!1;const f=l.read(c);return f?p.read(c).isPresent(f):!1});return _(`typingDebouncedFeatureState:
${a.audioCue.name}`,c=>a.debounceWhileTyping&&n.read(c)?(l.read(c),h.get()):h.read(c))}),s=_("states",a=>({lineNumber:l.read(a),featureStates:new Map(this.features.map((p,h)=>[p,i[h].read(a)]))}));e.add(Z("Play Audio Cue",s,({lastValue:a,newValue:p})=>{const h=this.features.filter(c=>{var f;return(p==null?void 0:p.featureStates.get(c))&&(!((f=a==null?void 0:a.featureStates)!=null&&f.get(c))||p.lineNumber!==a.lineNumber)});this.audioCueService.playAudioCues(h.map(c=>c.audioCue))}))}};F=S([b(0,$),b(1,q),b(2,k),b(3,R)],F);let v=class{constructor(t,r,e){this.audioCue=t,this.severity=r,this.markerService=e,this.debounceWhileTyping=!0,this._previousLine=0}getObservableState(t,r){return m(J.filter(this.markerService.onMarkerChanged,e=>e.some(u=>u.toString()===r.uri.toString())),()=>({isPresent:e=>{const u=e.lineNumber!==this._previousLine;return this._previousLine=e.lineNumber,this.markerService.read({resource:r.uri}).some(n=>{const i=n.severity===this.severity&&n.startLineNumber<=e.lineNumber&&e.lineNumber<=n.endLineNumber;return u?i:i&&e.lineNumber<=n.endLineNumber&&n.startColumn<=e.column&&n.endColumn>=e.column})}}))}};v=S([b(2,z)],v);class _e{constructor(){this.audioCue=C.foldedArea}getObservableState(t,r){const e=V.get(t);return e?ie(e.getFoldingModel()??Promise.resolve(void 0)).map(l=>({isPresent:n=>{var a;const i=(a=l.value)==null?void 0:a.getRegionAtLine(n.lineNumber);return i?i.isCollapsed&&i.startLineNumber===n.lineNumber:!1}})):ee({isPresent:()=>!1})}}let D=class{constructor(t){this.debugService=t,this.audioCue=C.break}getObservableState(t,r){return m(this.debugService.getModel().onDidChangeBreakpoints,()=>({isPresent:e=>this.debugService.getModel().getBreakpoints({uri:r.uri,lineNumber:e.lineNumber}).length>0}))}};D=S([b(0,L)],D);P.as(x.Workbench).registerWorkbenchContribution(F,3);P.as(x.Workbench).registerWorkbenchContribution(w,3);const d={type:"string",enum:["auto","on","off"],default:"auto",enumDescriptions:[o("audioCues.enabled.auto","Enable audio cue when a screen reader is attached."),o("audioCues.enabled.on","Enable audio cue."),o("audioCues.enabled.off","Disable audio cue.")],tags:["accessibility"]};P.as(se.Configuration).registerConfiguration({properties:{"audioCues.enabled":{markdownDeprecationMessage:"Deprecated. Use the specific setting for each audio cue instead (`audioCues.*`).",tags:["accessibility"]},"audioCues.volume":{description:o("audioCues.volume","The volume of the audio cues in percent (0-100)."),type:"number",minimum:0,maximum:100,default:70,tags:["accessibility"]},"audioCues.debouncePositionChanges":{description:o("audioCues.debouncePositionChanges","Whether or not position changes should be debounced"),type:"boolean",default:!1,tags:["accessibility"]},"audioCues.lineHasBreakpoint":{description:o("audioCues.lineHasBreakpoint","Plays a sound when the active line has a breakpoint."),...d},"audioCues.lineHasInlineSuggestion":{description:o("audioCues.lineHasInlineSuggestion","Plays a sound when the active line has an inline suggestion."),...d},"audioCues.lineHasError":{description:o("audioCues.lineHasError","Plays a sound when the active line has an error."),...d},"audioCues.lineHasFoldedArea":{description:o("audioCues.lineHasFoldedArea","Plays a sound when the active line has a folded area that can be unfolded."),...d},"audioCues.lineHasWarning":{description:o("audioCues.lineHasWarning","Plays a sound when the active line has a warning."),...d,default:"off"},"audioCues.onDebugBreak":{description:o("audioCues.onDebugBreak","Plays a sound when the debugger stopped on a breakpoint."),...d},"audioCues.noInlayHints":{description:o("audioCues.noInlayHints","Plays a sound when trying to read a line with inlay hints that has no inlay hints."),...d},"audioCues.taskCompleted":{description:o("audioCues.taskCompleted","Plays a sound when a task is completed."),...d},"audioCues.taskFailed":{description:o("audioCues.taskFailed","Plays a sound when a task fails (non-zero exit code)."),...d},"audioCues.terminalCommandFailed":{description:o("audioCues.terminalCommandFailed","Plays a sound when a terminal command fails (non-zero exit code)."),...d},"audioCues.terminalQuickFix":{description:o("audioCues.terminalQuickFix","Plays a sound when terminal Quick Fixes are available."),...d},"audioCues.diffLineInserted":{description:o("audioCues.diffLineInserted","Plays a sound when the focus moves to an inserted line in diff review mode or to the next/previous change"),...d},"audioCues.diffLineDeleted":{description:o("audioCues.diffLineDeleted","Plays a sound when the focus moves to a deleted line in diff review mode or to the next/previous change"),...d},"audioCues.diffLineModified":{description:o("audioCues.diffLineModified","Plays a sound when the focus moves to a modified line in diff review mode or to the next/previous change"),...d},"audioCues.notebookCellCompleted":{description:o("audioCues.notebookCellCompleted","Plays a sound when a notebook cell execution is successfully completed."),...d},"audioCues.notebookCellFailed":{description:o("audioCues.notebookCellFailed","Plays a sound when a notebook cell execution fails."),...d}}});ae(y);ne(ge);function De(){return{[k.toString()]:new te(oe)}}export{De as default};