'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){function q(b){var a;if(b.getOption("disableInput"))return e.Pass;for(var f=b.listSelections(),d,l=[],m=0;m<f.length;m++){var g=f[m].head,h=b.getTokenAt(g);if("comment"!=h.type)return e.Pass;var c=e.innerMode(b.getMode(),h.state).mode;if(!d)d=c;else if(d!=c)return e.Pass;c=null;if(d.blockCommentStart&&
d.blockCommentContinue){var k=h.string.indexOf(d.blockCommentEnd),n=b.getRange(e.Pos(g.line,0),e.Pos(g.line,h.end));if(!(-1!=k&&k==h.string.length-d.blockCommentEnd.length&&g.ch>=k))if(0==h.string.indexOf(d.blockCommentStart)){if(c=n.slice(0,h.start),!/^\s*$/.test(c))for(c="",k=0;k<h.start;++k)c+=" "}else-1!=(a=n.indexOf(d.blockCommentContinue))&&a+d.blockCommentContinue.length>h.start&&/^\s*$/.test(n.slice(0,a))&&(c=n.slice(0,a));null!=c&&(c+=d.blockCommentContinue)}null==c&&d.lineComment&&r(b)&&
(g=b.getLine(g.line),a=g.indexOf(d.lineComment),-1<a&&(c=g.slice(0,a),c=/\S/.test(c)?null:c+(d.lineComment+g.slice(a+d.lineComment.length).match(/^\s*/)[0])));if(null==c)return e.Pass;l[m]="\n"+c}b.operation(function(){for(var a=f.length-1;0<=a;a--)b.replaceRange(l[a],f[a].from(),f[a].to(),"+insert")})}function r(b){return(b=b.getOption("continueComments"))&&"object"==typeof b?!1!==b.continueLineComment:!0}for(var p=["clike","css","javascript"],l=0;l<p.length;++l)e.extendMode(p[l],{blockCommentContinue:" * "});
e.defineOption("continueComments",null,function(b,a,f){f&&f!=e.Init&&b.removeKeyMap("continueComment");a&&(f="Enter","string"==typeof a?f=a:"object"==typeof a&&a.key&&(f=a.key),a={name:"continueComment"},a[f]=q,b.addKeyMap(a))})});