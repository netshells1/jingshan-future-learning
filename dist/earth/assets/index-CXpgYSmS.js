(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Tt=Math.PI/180,Gn=180/Math.PI,We=864e5,fh=1495978707e-1,ph=6378.137,fr=86164.0905,Br=86400,cn=23.43929,mh=102.94,gh=.016709;function an(i){return i%=360,i<0?i+360:i}function Ms(i){return i=an(i),i>180?i-360:i}function _h(i,t,e){return i<t?t:i>e?e:i}function mc(i){return i/We+24405875e-1}function vh(i){const t=mc(i)-2451545,e=t/36525;return an(280.46061837+360.98564736629*t+387933e-9*e*e)}function ie(i,t){const e=mc(i),n=(e-2451545)/36525,s=an(280.46646+36000.76983*n+3032e-7*n*n),r=an(357.52911+35999.05029*n-1537e-7*n*n),a=.016708634-42037e-9*n-1267e-10*n*n,o=r*Tt,l=(1.914602-.004817*n-14e-6*n*n)*Math.sin(o)+(.019993-101e-6*n)*Math.sin(2*o)+289e-6*Math.sin(3*o),c=s+l,h=r+l,d=1.000001018*(1-a*a)/(1+a*Math.cos(h*Tt)),f=(125.04-1934.136*n)*Tt,m=an(c-.00569-.00478*Math.sin(f)),g=23+26/60+21.448/3600-(46.815*n+59e-5*n*n-.001813*n*n*n)/3600+.00256*Math.cos(f),_=m*Tt,p=g*Tt,u=an(Math.atan2(Math.cos(p)*Math.sin(_),Math.cos(_))*Gn),M=Math.asin(Math.sin(p)*Math.sin(_))*Gn;let v=Math.tan(p/2);v*=v;const x=s*Tt,L=(v*Math.sin(2*x)-2*a*Math.sin(o)+4*a*v*Math.sin(o)*Math.cos(2*x)-.5*v*v*Math.sin(4*x)-1.25*a*a*Math.sin(2*o))*Gn*4,T=t??vh(i),A=29.7847*Math.sqrt(2/d-1/1.000001018);return{ms:i,jd:e,T:n,L0:s,M:r,e:a,C:l,nu:an(h),lambda:m,earthLon:an(m+180),R:d,distKm:d*fh,eps:g,ra:u,dec:M,eot:L,gmst:T,subLat:M,subLon:Ms(u-T),v:A}}function Pa(i,t,e){const n=Ms(i.gmst+e-i.ra),{alt:s,az:r}=Tn(t,i.dec,n);return{alt:s,az:r,H:n,solarTime:an(n+180)/15}}function Tn(i,t,e){const n=i*Tt,s=t*Tt,r=e*Tt,a=Math.sin(n)*Math.sin(s)+Math.cos(n)*Math.cos(s)*Math.cos(r),o=Math.asin(_h(a,-1,1))*Gn,l=Math.atan2(-Math.cos(s)*Math.sin(r),Math.sin(s)*Math.cos(n)-Math.cos(s)*Math.sin(n)*Math.cos(r))*Gn;return{alt:o,az:an(l)}}function Da(i){if(i<-2)return 0;const t=Math.max(i,-1.9);return 1.02/Math.tan((t+10.3/(t+5.11))*Tt)/60}function Hn(i,t,e=-.833){const n=i*Tt,s=t*Tt,r=Math.cos(n)*Math.cos(s),a=Math.sin(e*Tt)-Math.sin(n)*Math.sin(s);if(Math.abs(r)<1e-9)return a<0?180:0;const o=a/r;return o<=-1?180:o>=1?0:Math.acos(o)*Gn}function pr(i,t){return 90-Math.abs(i-t)}function Gi(i){return 2*Math.PI*ph*Math.cos(i*Tt)/(fr/3600)}function xh(i,t,e,n=-.833){let s=ie(i);const r=Ms(s.gmst+e-s.ra);let a=i-r/15*36e5;s=ie(a),a-=Ms(s.gmst+e-s.ra)/15*36e5,s=ie(a);const o=Hn(t,s.dec,n),l={noon:a,dec:s.dec,noonAlt:pr(t,s.dec),halfArc:o,dayLength:o/7.5,polar:o>=180?"day":o<=0?"night":null,sunrise:null,sunset:null,riseAz:null,setAz:null};if(!l.polar){let c=a-o/15*36e5,h=a+o/15*36e5;const d=Hn(t,ie(c).dec,n),f=Hn(t,ie(h).dec,n);d>0&&d<180&&f>0&&f<180?(c=a-d/15*36e5,h=a+f/15*36e5,l.dayLength=(d+f)/15,l.riseAz=Tn(t,ie(c).dec,-d).az,l.setAz=Tn(t,ie(h).dec,f).az):(l.riseAz=Tn(t,s.dec,-o).az,l.setAz=Tn(t,s.dec,o).az),l.sunrise=c,l.sunset=h}return l}function pi(i,t){let e=t;for(let n=0;n<10;n++){const s=Ms(i-ie(e).lambda);if(e+=s/.98564736*We,Math.abs(s)<1e-6)break}return e}function Mo(i,t,e,n){const s=(Math.sqrt(5)-1)/2;let r=e-s*(e-t),a=t+s*(e-t);for(let o=0;o<60;o++){const l=i(r),c=i(a);(n?l<c:l>c)?e=a:t=r,r=e-s*(e-t),a=t+s*(e-t)}return(t+e)/2}const gc=["春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至","小寒","大寒","立春","雨水","惊蛰"];function Mh(i){const t=an(i),e=Math.floor(t/15);return{index:e,name:gc[e],progress:(t-e*15)/15}}const yo=new Map;function ts(i){const t=yo.get(i);if(t)return t;const e=Date.UTC(i,0,1),n=Date.UTC(i+1,0,1),s=a=>ie(a).R,r={year:i,start:e,end:n,marEquinox:pi(0,Date.UTC(i,2,20)),junSolstice:pi(90,Date.UTC(i,5,21)),sepEquinox:pi(180,Date.UTC(i,8,22)),decSolstice:pi(270,Date.UTC(i,11,21)),perihelion:Mo(s,e-6*We,Date.UTC(i,0,14),!0),aphelion:Mo(s,Date.UTC(i,5,24),Date.UTC(i,6,16),!1),terms:[]};for(let a=0;a<24;a++){let o=pi(a*15,r.marEquinox+a*15.2184*We);o>=n&&(o=pi(a*15,o-365.2422*We)),r.terms.push({name:gc[a],lambda:a*15,t:o})}return r.terms.sort((a,o)=>a.t-o.t),yo.set(i,r),r}function yh(i,t){let e=t<.8?i:Math.PI;for(let n=0;n<30;n++){const s=(e-t*Math.sin(e)-i)/(1-t*Math.cos(e));if(e-=s,Math.abs(s)<1e-10)break}return e}function Sh(i,t){const e=yh(i,t),n=2*Math.atan2(Math.sqrt(1+t)*Math.sin(e/2),Math.sqrt(1-t)*Math.cos(e/2));return{E:e,nu:n,r:1-t*Math.cos(e)}}const _r=[{name:"北京",lat:39.9,lon:116.4,note:"中国首都，北温带"},{name:"漠河",lat:52.97,lon:122.37,note:"中国最北城镇，夏至前后白夜"},{name:"哈尔滨",lat:45.75,lon:126.65,note:"东北地区，冬季漫长"},{name:"乌鲁木齐",lat:43.83,lon:87.62,note:"中国西部，地方时比北京晚约2小时"},{name:"上海",lat:31.23,lon:121.47,note:"长江入海口"},{name:"拉萨",lat:29.65,lon:91.1,note:"青藏高原，高海拔"},{name:"广州",lat:23.13,lon:113.26,note:"接近北回归线"},{name:"汕头",lat:23.35,lon:116.68,note:"位于北回归线附近"},{name:"海口",lat:20.03,lon:110.35,note:"热带，夏季太阳可直射"},{name:"曾母暗沙",lat:3.97,lon:112.33,note:"中国领土最南端"},{name:"新加坡",lat:1.35,lon:103.82,note:"近赤道，昼夜几乎等长"},{name:"基多",lat:-.22,lon:-78.51,note:"赤道之城"},{name:"开罗",lat:30.04,lon:31.24,note:"北非，尼罗河畔"},{name:"伦敦",lat:51.51,lon:-.13,note:"本初子午线附近"},{name:"纽约",lat:40.71,lon:-74.01,note:"北美东岸"},{name:"悉尼",lat:-33.87,lon:151.21,note:"南半球，季节与北半球相反"},{name:"乌斯怀亚",lat:-54.8,lon:-68.3,note:"世界最南端的城市之一"},{name:"特罗姆瑟",lat:69.65,lon:18.96,note:"北极圈内，有极昼极夜"},{name:"朗伊尔城",lat:78.22,lon:15.65,note:"斯瓦尔巴群岛，高纬度"},{name:"北极点",lat:90,lon:0,note:"北纬90°，半年昼半年夜"},{name:"南极中山站",lat:-69.37,lon:76.38,note:"中国南极科考站"},{name:"南极点",lat:-90,lon:0,note:"南纬90°"}];function _c(i){return _r.find(t=>t.name===i)}const ke=["earth","orbit"],Ua=[{id:"axis",label:"地轴",group:"地球",views:ke,hint:"连接南北极的自转轴"},{id:"rotDir",label:"自转方向",group:"地球",views:ke,hint:"自西向东（北极上空看为逆时针）"},{id:"equator",label:"赤道",group:"地球",views:ke,hint:"纬度 0°"},{id:"tropics",label:"南北回归线",group:"地球",views:ke,hint:"南北纬 23°26′，太阳直射的极限"},{id:"polar",label:"南北极圈",group:"地球",views:ke,hint:"南北纬 66°34′，极昼极夜的边界"},{id:"graticule",label:"经纬网",group:"地球",views:ke,hint:"每 15° 一条经线、纬线"},{id:"clouds",label:"云层",group:"地球",views:ke,hint:"大气中的云"},{id:"terminator",label:"晨昏线",group:"地球",views:ke,hint:"昼半球与夜半球的分界"},{id:"subsolar",label:"太阳直射点",group:"地球",views:ke,hint:"太阳光线垂直照射的地点"},{id:"rays",label:"太阳光线",group:"地球",views:ke,hint:"近似平行的太阳光"},{id:"localTime",label:"地方时",group:"地球",views:ke,hint:"每 15° 经线的当地平太阳时"},{id:"observer",label:"观测点与纬线圈",group:"地球",views:ke,hint:"点击地球可更换观测点"},{id:"linSpeed",label:"线速度示意",group:"地球",views:ke,hint:"不同纬度的自转线速度"},{id:"obliquity",label:"黄赤交角",group:"地球",views:ke,hint:"黄道面、赤道面与 23.44° 夹角"},{id:"orbit",label:"公转轨道",group:"公转",views:["orbit"],hint:"地球绕太阳的椭圆轨道"},{id:"monthTicks",label:"月份刻度",group:"公转",views:["orbit"],hint:"每月 1 日地球所在位置"},{id:"apsides",label:"近日点/远日点",group:"公转",views:["orbit"],hint:"轨道上距太阳最近/最远的点"},{id:"seasons",label:"二分二至",group:"公转",views:["orbit"],hint:"春分、夏至、秋分、冬至时地球的位置"},{id:"exaggerate",label:"夸大椭圆",group:"公转",views:["orbit"],hint:"把偏心率放大 10 倍，便于观察"},{id:"todayPath",label:"今日太阳轨迹",group:"天空",views:["ground"],hint:"今天太阳在天球上的路径"},{id:"seasonPaths",label:"二分二至轨迹",group:"天空",views:["ground"],hint:"春秋分、夏至、冬至的太阳路径"},{id:"analemma",label:"日行迹",group:"天空",views:["ground"],hint:"一年中同一钟点太阳的位置"},{id:"celestialEq",label:"天赤道与天极",group:"天空",views:["ground"],hint:"地球赤道与地轴向天球的延伸"},{id:"altazGrid",label:"高度/方位网格",group:"天空",views:["ground"],hint:"地平坐标网格"},{id:"gnomon",label:"立竿见影",group:"天空",views:["ground"],hint:"竿影的方向与长度"},{id:"stars",label:"星空",group:"通用",views:["earth","orbit","ground"],hint:"恒星与银河背景"},{id:"labels",label:"文字标注",group:"通用",views:["earth","orbit","ground"],hint:"显示图中文字标注"}],bh=["地球","公转","天空","通用"],Eh=Object.fromEntries(Ua.map(i=>[i.id,i.views])),kr=[{id:"declination",label:"直射点年变化",desc:"太阳直射点纬度（太阳赤纬）一年内在南北回归线之间往返一次。"},{id:"sideView",label:"光照图侧视",desc:"从侧面看昼夜分界：地轴倾斜，各纬线被晨昏线分成昼弧与夜弧。"},{id:"dayLength",label:"昼长年变化",desc:"当前纬度一年中昼长的变化。"},{id:"heatmap",label:"昼长热力图",desc:"横轴为日期、纵轴为纬度，颜色表示昼长。"},{id:"noonAlt",label:"正午太阳高度",desc:"正午太阳高度 H = 90° − |纬度 − 太阳直射点纬度|。"},{id:"distance",label:"日地距离与速度",desc:"一年中日地距离与地球公转线速度的变化。"},{id:"kepler",label:"开普勒第二定律",desc:"相同时间内，太阳与地球连线扫过的面积相等（图中椭圆已夸大）。"},{id:"sidereal",label:"恒星日与太阳日",desc:"地球自转一周（恒星日）比一个太阳日短约 3 分 56 秒。"},{id:"linearSpeed",label:"自转线速度",desc:"自转线速度随纬度增大而减小，赤道最快，两极为零。"},{id:"eot",label:"均时差",desc:"真太阳时与平太阳时之差，一年中在 −14 分到 +16 分之间变化。"}],Ut={appTitle:"地球运动课堂",intro:{title:"地球运动",subtitle:"自转 · 公转 · 四季 · 天空中的太阳",desc:"一颗倾斜 23.44° 的行星，每天自转一周，每年绕太阳一圈。昼夜、四季与我们头顶太阳的轨迹，都从这里开始。",start:"开始探索",hint:"建议使用横屏与全屏 · 支持鼠标、触控与键盘（← → 翻页，空格 播放 / 暂停）"},views:{earth:"地球",orbit:"轨道",ground:"地面"},groundModes:{sphere:"天球模型",immersive:"身临其境"},tabs:{data:"数据",layers:"图层",settings:"设置"},timeline:{now:"此刻",beijing:"北京时间",utc:"UTC",year:"年内日期",hour:"时刻",events:{marEquinox:"春分",junSolstice:"夏至",sepEquinox:"秋分",decSolstice:"冬至",perihelion:"近日点",aphelion:"远日点"}},settings:{quality:"画质",qualities:{high:"高",medium:"中",low:"低"},largeFont:"大字号",fullscreen:"全屏",exitFullscreen:"退出全屏",hideUI:"隐藏界面",showUI:"显示界面",keys:"键盘快捷键"},data:{custom:"自定义位置（点击地球选取）",lat:"纬度",lon:"经度",refraction:"考虑大气折射",sun:"太阳",earth:"地球",observer:"观测点",charts:"图表"},keys:[["空格","播放 / 暂停"],["← →","上一步 / 下一步"],["1 – 5","切换章节"],["E / O / G","地球 / 轨道 / 地面视图"],["L","图层面板"],["D","数据面板"],["H","隐藏 / 显示界面"],["F","全屏"]],lesson:{prev:"上一步",next:"下一步",think:"想一想",try:"试一试"},explore:{setScene:"设置场景",hint:"提示",answer:"查看答案",hide:"收起"}},mi=i=>i.map(t=>({label:t,setup:{city:t}})),mn=[{id:"rotation",num:"01",title:"地球自转",short:"自转",summary:"地球绕地轴转动，带来昼夜交替与地方时差异。",steps:[{id:"tilted",kicker:"1 / 6 · 认识地球",title:"一颗倾斜着旋转的星球",body:["地球像一个不停转动的陀螺，围绕一条假想的直线——地轴——旋转。地轴穿过地心，连接北极和南极，北端大致指向北极星附近。","地轴并不垂直于地球公转的轨道平面（黄道面），而是倾斜了约 23.44°，这个夹角叫作“黄赤交角”。正是这个倾角，让我们拥有了四季。","拖动鼠标可以旋转视角，滚轮缩放。图中金色的平面是黄道面，蓝色的平面是赤道面，两者之间的夹角就是黄赤交角。"],points:["地轴：南北极连线，北端指向北极星附近","黄赤交角约 23.44°","赤道面是垂直于地轴的平面"],question:"如果地轴垂直于黄道面（没有倾斜），一年中的昼夜长短会怎样变化？",setup:{view:"earth",layers:["axis","equator","obliquity","clouds","observer"],time:{now:!0},speed:3,play:!0,focus:"side"}},{id:"west-east",kicker:"2 / 6 · 自转方向",title:"自西向东",body:["从北极上空俯视，地球沿逆时针方向转动；从南极上空看则是顺时针。地面上的我们随地球一起向东运动。","因为地球自西向东转，所以我们看到太阳、月亮和星星“东升西落”——这是地球自转的视觉反映，而不是天体真的绕着我们转。","图中的箭头标出了自转方向。试着从北极上空的视角观察，再拖动到其他角度对比。"],points:["自转方向：自西向东","北极上空看逆时针，南极上空看顺时针","天体东升西落是自转的视运动"],question:"站在赤道上看，太阳是从哪个方向升起的？",actions:[{label:"北极上空",setup:{focus:"pole"}},{label:"回到侧面",setup:{focus:"side"}}],setup:{view:"earth",layers:["axis","rotDir","equator","graticule","clouds","observer"],speed:3,play:!0,focus:"pole"}},{id:"day-night",kicker:"3 / 6 · 昼与夜",title:"昼夜交替与晨昏线",body:["太阳光只能照亮地球的一半，被照亮的半球是昼半球，另一半是夜半球。昼夜两个半球的分界线叫作晨昏线（圈），它是一个以地心为圆心的大圆。","地球不停自转，地面上的每一点轮流经过昼半球和夜半球，于是形成了昼夜交替，周期约为一天。","太阳光线垂直照射的地点叫作太阳直射点。观察图中金色标记：它始终位于昼半球的正中央，随时间在地面上向西移动。"],points:["晨昏线是昼夜半球的分界，是大圆","自转使昼夜交替，周期约 24 小时","直射点位于昼半球中心，向西移动"],question:"晨昏线会不会一直经过南北两极？什么时候会？",actions:[{label:"日照侧视图",setup:{focus:"side",chart:"sideView",openData:!0}},{label:"看向太阳",setup:{focus:"sun"}}],setup:{view:"earth",layers:["axis","equator","terminator","subsolar","rays","clouds","observer"],speed:3,play:!0,focus:"sun",chart:"sideView"}},{id:"speed",kicker:"4 / 6 · 转得有多快",title:"角速度与线速度",body:["除两极点外，地球上所有地点自转的角速度都相同：每小时转过约 15°（360° ÷ 24 小时）。","但线速度却不同。线速度 v = 2πR·cosφ ÷ T，其中 φ 为纬度。赤道上线速度最大，约 1674 km/h；北京（约 40°N）约 1280 km/h；纬度越高越慢，到两极降为零。","地球上的我们感觉不到这种高速运动，因为周围的大气、海洋和地面都以同样的速度一起运动。"],points:["角速度：约 15°/小时，除两极外处处相同","线速度：赤道最大 ≈ 1674 km/h，随纬度增高而减小","两极点线速度为零"],question:"漠河（约 53°N）的自转线速度大约是赤道的多少倍？",actions:mi(["新加坡","北京","漠河","北极点"]),setup:{view:"earth",layers:["axis","equator","linSpeed","observer","graticule","clouds"],speed:3,play:!0,focus:"observer",chart:"linearSpeed",openData:!0}},{id:"sidereal-solar",kicker:"5 / 6 · 一天有多长",title:"恒星日与太阳日",body:["以遥远恒星为参照，地球自转一周 360° 所需的时间叫恒星日，约 23 小时 56 分 4 秒。","以太阳为参照，太阳连续两次经过同一子午线的时间间隔叫太阳日，平均 24 小时。因为地球一边自转一边公转，每天要多转约 0.9856° 才能再次“面对”太阳，多花约 3 分 56 秒。","一年约有 365.24 个太阳日，却有约 366.24 个恒星日——地球一年恰好比太阳日数“多自转一圈”。"],points:["恒星日 ≈ 23时56分4秒（自转 360°）","太阳日 = 24 小时（自转约 360.9856°）","一年约 365.24 个太阳日，366.24 个恒星日"],question:"为什么每天多出来的角度恰好约为 1°？",setup:{view:"orbit",layers:["orbit","axis","subsolar","terminator","clouds"],speed:4,play:!0,chart:"sidereal",openData:!0}},{id:"local-time",kicker:"6 / 6 · 时间与经度",title:"地方时：东边的时刻更早",body:["地球自西向东转，东边的地点总是先迎来日出，所以经度越靠东，地方时越早。经度每相差 15°，地方时相差 1 小时；相差 1°，相差 4 分钟。","为了避免各地时刻各不相同，人们划分了时区。中国统一使用东八区的区时——北京时间（东经 120° 的地方时）。","因此乌鲁木齐（约 88°E）的太阳时比北京时间晚约 2 小时，当地正午时北京时间已过 14 点。打开“地方时”图层，看看每条经线上此刻是几点。"],points:["经度每差 15°，地方时差 1 小时","东边的地方时更早","北京时间 = 东经 120° 的地方时"],question:"纽约（74°W）的时刻比北京早还是晚？大约差多少小时？",actions:mi(["北京","乌鲁木齐","伦敦","纽约"]),setup:{view:"earth",layers:["axis","equator","localTime","terminator","subsolar","observer","clouds"],speed:3,play:!1,focus:"pole",openData:!1}}]},{id:"revolution",num:"02",title:"地球公转",short:"公转",summary:"地球绕太阳运行，轨道是椭圆，地轴指向保持不变。",steps:[{id:"year",kicker:"1 / 5 · 一年",title:"绕太阳一周，就是一年",body:["地球在引力作用下绕太阳公转，方向与自转相同，自西向东（从北极上空俯视为逆时针）。","以春分点为参照，地球绕太阳转一圈所需时间叫回归年，约 365.2422 天，这就是我们日历中“一年”的由来；以恒星为参照的周期叫恒星年，约 365.2564 天。","地球公转的平均速度约 29.8 km/s，大约是子弹速度的 30 倍。图中的刻度标出了每月 1 日地球所在的位置。"],points:["公转方向：自西向东（与自转相同）","回归年 ≈ 365.2422 天；恒星年 ≈ 365.2564 天","平均公转速度 ≈ 29.8 km/s"],question:"为什么日历要设置闰年？",setup:{view:"orbit",layers:["orbit","monthTicks","seasons","axis","clouds"],time:{md:[1,1],hour:12},speed:3,play:!0,chart:"distance"}},{id:"apsides",kicker:"2 / 5 · 椭圆轨道",title:"近日点与远日点",body:["地球的公转轨道是一个很接近正圆的椭圆，太阳位于椭圆的一个焦点上。为了看得清楚，可以打开“夸大椭圆”，它把偏心率放大了 10 倍。","每年 1 月初，地球离太阳最近，叫近日点，距离约 1.471 亿千米；每年 7 月初，地球离太阳最远，叫远日点，距离约 1.521 亿千米。两者相差只有约 3%。","北半球的冬天恰在近日点附近，夏天在远日点附近——可见，四季的成因不是日地距离的远近。"],points:["近日点 ≈ 1月初，约 1.471 亿 km","远日点 ≈ 7月初，约 1.521 亿 km","距离差仅约 3%，不是四季成因"],question:"近日点时北半球是什么季节？南半球呢？",actions:[{label:"近日点",setup:{time:{event:"perihelion"},play:!1}},{label:"远日点",setup:{time:{event:"aphelion"},play:!1}}],setup:{view:"orbit",layers:["orbit","apsides","monthTicks","exaggerate","clouds"],time:{event:"perihelion"},speed:3,play:!1,chart:"distance",openData:!0}},{id:"kepler",kicker:"3 / 5 · 速度的变化",title:"开普勒第二定律",body:["开普勒第二定律指出：行星与太阳的连线，在相等的时间内扫过相等的面积。","因此，地球在近日点附近离太阳近，要走得更快才能扫过同样的面积——约 30.3 km/s；在远日点附近离太阳远，速度较慢——约 29.3 km/s。","这也是为什么北半球冬半年（秋分到春分）约 179 天，比夏半年（春分到秋分）约 186 天短几天。图表中把椭圆夸大了，便于看清扫过面积的形状。"],points:["相同时间扫过相同面积","近日点速度最大 ≈ 30.3 km/s","远日点速度最小 ≈ 29.3 km/s"],question:"一年中地球公转角速度最大的是哪个月？",setup:{view:"orbit",layers:["orbit","apsides","monthTicks","exaggerate","clouds"],time:{event:"perihelion"},speed:3,play:!0,chart:"kepler",openData:!0}},{id:"obliquity",kicker:"4 / 5 · 倾斜的轴",title:"黄赤交角",body:["地球公转轨道所在的平面叫黄道面；地球赤道所在的平面叫赤道面。这两个平面的夹角就是黄赤交角，目前约为 23°26′（23.44°）。","黄赤交角决定了回归线和极圈的位置：南北回归线的纬度等于黄赤交角，极圈的纬度等于 90° 减去黄赤交角（66°34′）。","在漫长的岁月里，黄赤交角会在大约 22.1° 到 24.5° 之间缓慢变化，周期约 4.1 万年。"],points:["黄赤交角 ≈ 23°26′","回归线纬度 = 黄赤交角","极圈纬度 = 90° − 黄赤交角"],question:"如果黄赤交角变为 30°，回归线和极圈的纬度分别是多少？",setup:{view:"earth",layers:["axis","equator","tropics","polar","obliquity","clouds","terminator"],speed:3,play:!1,focus:"side",openData:!1}},{id:"axis-fixed",kicker:"5 / 5 · 指向不变",title:"地轴的指向不变",body:["地球公转时，地轴的倾斜方向几乎保持不变，始终指向北极星附近，这叫作地轴的平行移动。","于是，在公转轨道的不同位置，北极有时偏向太阳、有时偏离太阳：夏至时北极偏向太阳，冬至时偏离，春分秋分时则不偏不倚。","严格地说，地轴指向会因“岁差”而缓慢画圆，周期约 2.58 万年——大约 1.2 万年后，织女星将取代北极星成为“北极星”。"],points:["公转中地轴方向不变（平行移动）","北极偏向太阳 → 北半球夏季","岁差周期约 2.58 万年"],question:"为什么夏至时北半球昼长夜短？",actions:[{label:"春分",setup:{time:{event:"marEquinox"},play:!1}},{label:"夏至",setup:{time:{event:"junSolstice"},play:!1}},{label:"秋分",setup:{time:{event:"sepEquinox"},play:!1}},{label:"冬至",setup:{time:{event:"decSolstice"},play:!1}}],setup:{view:"orbit",layers:["orbit","seasons","axis","monthTicks","terminator","clouds"],speed:3,play:!0,time:{md:[1,1],hour:12}}}]},{id:"seasons",num:"03",title:"四季",short:"四季",summary:"直射点南北移动，造成昼夜长短与正午太阳高度的变化。",steps:[{id:"subsolar",kicker:"1 / 6 · 直射点",title:"太阳直射点的回归运动",body:["太阳直射点（太阳在天顶的地点）的纬度，就是太阳的赤纬。它并不固定在赤道上，而是在南北回归线之间往返移动，周期为一个回归年。","春分日直射赤道，随后北移，夏至日到达北回归线（23°26′N）；之后南移，秋分日再次直射赤道，冬至日到达南回归线（23°26′S）。","直射点这样往返于南北回归线之间，叫作“太阳直射点的回归运动”，“回归线”之名由此而来。"],points:["直射点在南北回归线间往返，周期一个回归年","春分、秋分直射赤道","夏至直射北回归线，冬至直射南回归线"],question:"一年中，直射点有几次经过赤道？分别在什么时候？",setup:{view:"earth",layers:["axis","equator","tropics","subsolar","terminator","rays","clouds"],time:{md:[3,1],hour:12},speed:3,play:!0,chart:"declination",openData:!0,focus:"side"}},{id:"equinox-solstice",kicker:"2 / 6 · 四个节点",title:"二分二至",body:["春分（约 3 月 20 日）和秋分（约 9 月 23 日）：太阳直射赤道，全球昼夜等长，晨昏线通过南北两极。","夏至（约 6 月 21 日）：太阳直射北回归线，北半球昼最长夜最短；冬至（约 12 月 22 日）：太阳直射南回归线，北半球昼最短夜最长。","这四个时刻把一年分成四个季节。点击下面的按钮，在轨道视图中比较四个位置地轴与太阳的相对方向。"],points:["春分、秋分：直射赤道，昼夜平分","夏至：直射北回归线，北半球昼最长","冬至：直射南回归线，北半球昼最短"],question:"夏至时，南半球的昼夜情况如何？",actions:[{label:"春分",setup:{time:{event:"marEquinox"},play:!1}},{label:"夏至",setup:{time:{event:"junSolstice"},play:!1}},{label:"秋分",setup:{time:{event:"sepEquinox"},play:!1}},{label:"冬至",setup:{time:{event:"decSolstice"},play:!1}}],setup:{view:"orbit",layers:["orbit","seasons","axis","tropics","terminator","subsolar","monthTicks","clouds"],time:{event:"junSolstice"},speed:3,play:!1,chart:"declination",openData:!0}},{id:"noon-alt",kicker:"3 / 6 · 太阳有多高",title:"正午太阳高度",body:["一天中太阳最高的时刻是正午。正午太阳高度 H = 90° − |φ − δ|，其中 φ 是观测点纬度，δ 是太阳直射点纬度（太阳赤纬）。","直射点所在纬度，正午太阳高度为 90°（太阳在天顶）；离直射点越远，正午太阳高度越低。同一纬度，夏至和冬至的正午太阳高度相差约 46.9°（两倍的黄赤交角）。","正午太阳高度越大，单位面积获得的太阳辐射越多、气温越高，这是夏热冬冷的主要原因之一。"],points:["H = 90° − |纬度 − 直射点纬度|","直射点处正午太阳在天顶","夏冬两至正午高度差 = 2 × 23.44°"],question:"北京（39.9°N）夏至日和冬至日的正午太阳高度各是多少？",actions:[...mi(["北京","广州","新加坡","悉尼"]),{label:"夏至",setup:{time:{event:"junSolstice"}}},{label:"冬至",setup:{time:{event:"decSolstice"}}}],setup:{view:"earth",layers:["axis","equator","tropics","subsolar","terminator","observer","rays","clouds"],time:{event:"junSolstice"},speed:3,play:!1,chart:"noonAlt",openData:!0,focus:"observer"}},{id:"day-length",kicker:"4 / 6 · 白天多长",title:"昼夜长短的变化",body:["同一地点昼夜长短随季节变化。夏半年（春分到秋分），北半球昼长夜短，纬度越高昼越长；冬半年则相反，昼短夜长。春分、秋分，全球昼夜等长。","原因在于晨昏线把各条纬线分成昼弧和夜弧：夏至时，北半球纬线的昼弧占比大于一半；纬度越高，昼弧越长。","赤道上全年昼夜几乎等长（约 12 小时）；而纬度越高，一年中昼长的变化幅度越大。拖动日期，观察北京与其他城市昼长的差异。"],points:["夏半年北半球昼长夜短，冬半年相反","春分、秋分全球昼夜等长","纬度越高，昼长年变化幅度越大"],question:"赤道上一年四季昼长变化大吗？为什么？",actions:[...mi(["新加坡","北京","漠河"]),{label:"夏至",setup:{time:{event:"junSolstice"}}},{label:"冬至",setup:{time:{event:"decSolstice"}}}],setup:{view:"earth",layers:["axis","equator","tropics","terminator","subsolar","observer","clouds"],time:{event:"junSolstice"},speed:3,play:!1,chart:"dayLength",openData:!0,focus:"side"}},{id:"polar-day",kicker:"5 / 6 · 白夜与黑夜",title:"极昼与极夜",body:["夏至前后，北极圈以内的地区太阳整天不落，叫极昼（白夜）；同一时间南极圈以内则整天不见太阳，叫极夜。冬至前后情形相反。","极昼极夜出现的条件是：当地纬度的绝对值大于 90° − |太阳赤纬|。纬度越高，持续时间越长，南北极点处各约半年。","极昼极夜现象只出现在极圈以内，而回归线以内（热带）则有“太阳直射”现象。热力图中白色/金色区域表示昼长趋近 24 小时。"],points:["极圈以内才会出现极昼极夜","夏至北极圈内极昼，南极圈内极夜","两极点昼夜各约半年"],question:"在北极点，一年中太阳大约有多久在地平线以上？",actions:mi(["漠河","特罗姆瑟","朗伊尔城","北极点","南极中山站"]),setup:{view:"earth",layers:["axis","equator","polar","terminator","subsolar","observer","clouds"],time:{event:"junSolstice"},speed:3,play:!1,city:"特罗姆瑟",chart:"heatmap",openData:!0,focus:"pole"}},{id:"why-seasons",kicker:"6 / 6 · 小结",title:"四季从何而来",body:["四季的成因是：地轴倾斜（黄赤交角）+ 地轴指向不变 + 地球公转。三者缺一不可。","它使得太阳直射点在南北回归线间移动，各地正午太阳高度和昼长发生周期性变化，从而获得的太阳辐射不同，形成冷暖交替的四季。","四季与日地距离无关：1 月初地球在近日点，北半球却是冬季；南半球的季节则与北半球相反。试着播放整年，观察地轴方向与季节的对应关系。"],points:["成因：地轴倾斜 + 方向不变 + 公转","近日点（1月）北半球为冬季","南北半球季节相反"],question:"如果没有黄赤交角，地球上还会有四季吗？",setup:{view:"orbit",layers:["orbit","seasons","axis","apsides","monthTicks","terminator","subsolar","clouds"],time:{md:[1,1],hour:12},speed:3,play:!0,chart:"declination",openData:!1}}]},{id:"sky",num:"04",title:"天空",short:"天空",summary:"站在地面，看太阳与星空的运动。",steps:[{id:"land",kicker:"1 / 6 · 换个视角",title:"降落：站到地球表面",body:["现在，我们从太空降落到地面。站在地面看天，天空像一个倒扣的巨大半球，这就是想象中的“天球”。我们位于天球的中心，地平圈是天球与地面的交界。","天球正上方的点叫天顶，用“高度角”（从地平线向上量度）和“方位角”（从正北顺时针量度）可以确定天空中任意一点的位置。","“天球模型”视图中，网格就是高度—方位坐标，拖动鼠标可以绕着天球观察。金色的点是太阳此刻所在的位置。"],points:["天球：以观测者为中心的想象球面","高度角：自地平线向上量；方位角：自正北顺时针量","天顶：头顶正上方"],question:"太阳的高度角为负值意味着什么？",setup:{view:"ground",groundMode:"sphere",layers:["altazGrid","todayPath","gnomon","celestialEq"],time:{hourOfDay:10},speed:2,play:!1,openData:!0}},{id:"gnomon",kicker:"2 / 6 · 太阳的一天",title:"太阳的一天与竿影",body:["一天中，太阳从东方地平线升起，高度逐渐升高，正午时最高，然后下落，从西方落下。太阳的运动轨迹是一条平行于天赤道的圆弧。","在地面立一根竿，太阳照射时产生竿影。早晚太阳低，影子长；正午太阳最高，影子最短。在北回归线以北的地区，正午影子总是指向正北。","这就是古人的“立竿见影”：测量正午竿影的长度，就能推算出节气与回归年长度。点击播放，观察影子的变化。"],points:["太阳轨迹：平行于天赤道的圆弧","正午竿影最短，指向正北（北回归线以北）","古人用圭表测影推算节气"],question:"竿影的方向与太阳的方位有什么关系？",setup:{view:"ground",groundMode:"sphere",layers:["altazGrid","todayPath","gnomon"],time:{hourOfDay:6},speed:2,play:!0,openData:!0}},{id:"three-paths",kicker:"3 / 6 · 季节的轨迹",title:"一年中的三条轨迹",body:["一年中，太阳每日的路径随季节变化。春分与秋分，太阳从正东升起、正西落下，轨迹与天赤道重合；夏至时，轨迹升高，从东北升起、西北落下；冬至时则降低，从东南升起、西南落下（北半球）。","图中三条圆弧：白色为春秋分、橙红色为夏至、蓝色为冬至。夏至日太阳在天空走的路径最长，所以白天最长。","点击下面的按钮，把日期调到二分二至，观察当天太阳的位置、日出方位和竿影长度。"],points:["春秋分：正东升、正西落","夏至：东北升、西北落，路径最高最长","冬至：东南升、西南落，路径最低最短"],question:"夏至时，北京的日出方位偏向东北还是东南？",actions:[{label:"春分",setup:{time:{event:"marEquinox"},play:!1}},{label:"夏至",setup:{time:{event:"junSolstice"},play:!1}},{label:"秋分",setup:{time:{event:"sepEquinox"},play:!1}},{label:"冬至",setup:{time:{event:"decSolstice"},play:!1}}],setup:{view:"ground",groundMode:"sphere",layers:["altazGrid","todayPath","seasonPaths","gnomon"],time:{event:"junSolstice"},speed:2,play:!1,openData:!0}},{id:"latitude",kicker:"4 / 6 · 不同纬度",title:"换一个纬度看看",body:["站在不同的纬度，天空看起来大不相同。天赤道总是与地平线斜交，交角等于 90° 减去当地纬度；北天极的高度角等于当地纬度。","在北京，太阳轨迹向南倾斜；在赤道，太阳轨迹垂直于地平线，昼夜几乎等长；在北极点，太阳轨迹几乎与地平线平行，整日不落或整日不见。","在南半球（如悉尼），太阳在正午时位于北方，竿影指向南方，与北半球正好相反。点击下面的城市，切换观察。"],points:["北天极的高度角 = 当地纬度","赤道：太阳轨迹垂直于地平线","南半球正午太阳在北方，竿影朝南"],question:"在北极点，太阳轨迹是什么样的？",actions:mi(["北京","新加坡","悉尼","特罗姆瑟","北极点"]),setup:{view:"ground",groundMode:"sphere",layers:["altazGrid","todayPath","seasonPaths","celestialEq","gnomon"],time:{event:"junSolstice"},speed:2,play:!1,openData:!0}},{id:"immersive",kicker:"5 / 6 · 沉浸体验",title:"身临其境：日落与星空",body:["现在切换到“身临其境”：你站在平坦的地面上，可以拖动鼠标环顾四周，滚轮可以缩放视野。","太阳落下后，天空逐渐变暗，星星依次浮现，整个星空绕着一个点——北天极——缓缓转动。在北半球，这个点就在北方的天空，高度等于当地纬度，附近有北极星。","加快时间的流逝，观察日落、晨昏蒙影、星空旋转，并留意：星星同样东升西落，这同样是地球自转的结果。"],points:["可拖动环顾四周，滚轮缩放视野","星空绕北天极旋转（地球自转的反映）","日落后天空经历民用、航海、天文三种蒙影"],question:"北极星的高度角与观测者所在纬度有什么关系？",setup:{view:"ground",groundMode:"immersive",layers:["gnomon","todayPath","celestialEq"],time:{hourOfDay:17},speed:2,play:!0,openData:!1}},{id:"analemma",kicker:"6 / 6 · 太阳的“8”字",title:"日行迹与均时差",body:["如果每天在同一钟点（比如北京时间 12:00）拍一张太阳的照片，叠加在一起，一年下来太阳会画出一个“8”字形，这就是日行迹（analemma）。","“8”字的上下范围由太阳赤纬（±23.44°）决定；左右摆动则由均时差造成——真太阳时与钟表（平太阳）时间有差异，最大约 +16 分、−14 分。","均时差来自两个原因：地球公转轨道是椭圆（速度不均匀）和黄赤交角（太阳在赤道上的投影速度不均匀）。"],points:["日行迹：同一钟点太阳一年的位置，呈“8”字","纵向：太阳赤纬；横向：均时差","均时差最大约 +16 分、−14 分"],question:"日行迹为什么是“8”字形而不是一个圆？",setup:{view:"ground",groundMode:"sphere",layers:["altazGrid","analemma","todayPath","gnomon"],time:{hourOfDay:12},speed:3,play:!1,chart:"eot",openData:!0}}]},{id:"explore",num:"05",title:"探索",short:"探索",summary:"用学到的知识动手验证。",steps:[{id:"hands-on",kicker:"综合实践",title:"动手验证",body:["学完前面的内容，是时候亲手验证了！下面有 6 个探究任务，每个任务先点击“设置场景”，再通过时间轴、图层、城市和各种图表去观察，完成后可查看参考答案。","你可以自由修改日期、时刻与观测点，点击地球也可以选取任意位置。尝试用自己的发现，去解释每一个现象背后的地球运动。"],points:["自由操作时间轴、图层与观测点","先观察、后推理、再看答案","点击地球可选取任意观测位置"],setup:{view:"earth",layers:["axis","equator","tropics","polar","terminator","subsolar","observer","clouds"],time:{now:!0},speed:3,play:!1,openData:!0,focus:"side"}}],tasks:[{title:"任务一：追踪太阳直射点",goal:"把日期分别调到春分、夏至、秋分、冬至，记录太阳直射点的纬度。",setup:{view:"earth",time:{event:"junSolstice"},play:!1,chart:"declination",focus:"side",openData:!0},hint:"使用时间轴上的“春分/夏至/秋分/冬至”按钮，观察“数据”面板中的直射点纬度。",answer:"春分、秋分直射点约在 0°（赤道）；夏至约在 23.4°N（北回归线）；冬至约在 23.4°S（南回归线）。"},{title:"任务二：同一天，不同城市的昼长",goal:"在夏至日分别比较新加坡、北京、漠河的昼长，思考昼长与纬度的关系。",setup:{view:"earth",time:{event:"junSolstice"},city:"漠河",play:!1,chart:"dayLength",openData:!0,focus:"side"},hint:"切换“数据”面板的城市，查看观测点的“昼长”，并对照“昼长年变化”曲线。",answer:"夏至日：新加坡约 12 时 07 分，北京约 15 时 00 分，漠河约 17 时 00 分左右。纬度越高，夏至日北半球昼越长。"},{title:"任务三：寻找极昼与极夜",goal:"把观测点设在特罗姆瑟，找出哪些日期当地出现极昼、哪些出现极夜。",setup:{view:"earth",time:{event:"junSolstice"},city:"特罗姆瑟",play:!1,chart:"heatmap",openData:!0,focus:"pole"},hint:"在昼长热力图中找到纵轴约 69.65°N 的位置，观察颜色何时到达金色（24 小时）与深蓝（0 小时）。",answer:"特罗姆瑟（69.65°N）大约从 5 月下旬到 7 月下旬出现极昼；大约从 11 月下旬到 1 月中旬出现极夜。"},{title:"任务四：近日点是夏天吗？",goal:"分别跳到近日点和远日点，看看日地距离与两个半球季节的对应关系。",setup:{view:"orbit",time:{event:"perihelion"},play:!1,chart:"distance",openData:!0},hint:"使用“近日点/远日点”按钮，对比日地距离与此时直射点所在半球。",answer:"近日点在 1 月初，此时北半球是冬季、直射点在南半球；远日点在 7 月初，北半球是夏季。可见季节由地轴倾斜决定，与日地距离无关。"},{title:"任务五：让竿影消失",goal:"在“地面”视图中，找到某个纬度和日期，使正午时竿影长度为零。",setup:{view:"ground",groundMode:"sphere",city:"汕头",time:{event:"junSolstice"},play:!1,chart:"noonAlt",openData:!0},hint:"正午太阳在天顶时，竿影为零。需要太阳直射该地，即当地纬度等于太阳直射点纬度。",answer:"夏至日正午，位于北回归线附近的地点（如汕头，23.35°N）竿影几乎为零；在回归线以内的地区，一年有两次正午无影。"},{title:"任务六：太阳从哪里升起",goal:"在北京分别查看春分、夏至、冬至日的日出方位，并在“身临其境”视图中验证。",setup:{view:"ground",groundMode:"sphere",city:"北京",time:{event:"marEquinox"},play:!1,chart:"noonAlt",openData:!0},hint:"在“数据”面板的“观测点”部分查看日出方位，并配合“二分二至轨迹”图层。",answer:"春分、秋分日出正东（方位角约 90°）；夏至日出东偏北约 60°（北京约 59°）；冬至日出东偏南约 120°（北京约 121°）。"}]}],Th=["周日","周一","周二","周三","周四","周五","周六"];function He(i,t){const e=new Date(i+t*36e5);return{year:e.getUTCFullYear(),month:e.getUTCMonth()+1,day:e.getUTCDate(),hour:e.getUTCHours(),minute:e.getUTCMinutes(),second:e.getUTCSeconds(),weekday:e.getUTCDay()}}function vr(i,t,e,n,s,r){return Date.UTC(i,t-1,e,n,s)-r*36e5}function li(i,t){return Date.UTC(i,0,1)-t*36e5}function vc(i){return i%4===0&&i%100!==0||i%400===0?366:365}function Cr(i,t){const e=He(i,t);return(i-li(e.year,t))/We}const gn=i=>String(i).padStart(2,"0");function wh(i,t){const e=He(i,t);return`${e.year}年${e.month}月${e.day}日 ${Th[e.weekday]} ${gn(e.hour)}:${gn(e.minute)}:${gn(e.second)}`}function xr(i,t){const e=He(i,t);return`${e.month}月${e.day}日`}function So(i,t){const e=He(i,t);return`${gn(e.hour)}:${gn(e.minute)}`}function gs(i){if(!isFinite(i))return"--";const t=Math.round(i*60);return`${Math.floor(t/60)}时${gn(t%60)}分`}function bo(i){const t=Math.round((i%24+24)%24*60)%1440;return`${gn(Math.floor(t/60))}:${gn(t%60)}`}function Eo(i,t=2){const e=Math.abs(i);return e<.005?"0° 赤道":`${e.toFixed(t)}°${i>=0?"N":"S"}`}function Gr(i,t=2){const e=Math.abs(i);return e<.005?"0°":Math.abs(e-180)<.005?"180°":`${e.toFixed(t)}°${i>=0?"E":"W"}`}function Ah(i,t=2){return`${i.toFixed(t)}°`}function To(i,t=0){return i.toLocaleString("zh-CN",{minimumFractionDigits:t,maximumFractionDigits:t})}function Hr(i){const t=Math.round(i),e=Math.floor(t/3600),n=Math.floor(t%3600/60),s=t%60;return`${e}时${gn(n)}分${gn(s)}秒`}const Rh=["北","东北","东","东南","南","西南","西","西北"];function Vr(i){const t=Math.round((i%360+360)%360/45)%8;return Rh[t]}const mr=["axis","rotDir","equator","tropics","polar","graticule","clouds","terminator","subsolar","rays","localTime","observer","orbit","monthTicks","apsides","seasons","obliquity","linSpeed","todayPath","seasonPaths","analemma","celestialEq","altazGrid","stars","gnomon","labels","exaggerate"],Za=[{label:"实时",rate:1},{label:"1分/秒",rate:60},{label:"10分/秒",rate:600},{label:"1时/秒",rate:3600},{label:"4时/秒",rate:14400},{label:"1天/秒",rate:86400},{label:"5天/秒",rate:432e3},{label:"30天/秒",rate:2592e3}],xc={axis:!0,rotDir:!1,equator:!0,tropics:!1,polar:!1,graticule:!1,clouds:!0,terminator:!0,subsolar:!0,rays:!1,localTime:!1,observer:!0,orbit:!0,monthTicks:!0,apsides:!1,seasons:!0,obliquity:!1,linSpeed:!1,todayPath:!0,seasonPaths:!1,analemma:!1,celestialEq:!1,altazGrid:!1,stars:!0,gnomon:!0,labels:!0,exaggerate:!1};function Ia(i,t){try{const e=localStorage.getItem("eim:"+i);return e===null?t:JSON.parse(e)}catch{return t}}function Ch(){const i=Ia("quality",null);return i||(Math.min(window.innerWidth,window.innerHeight)<600?"low":"high")}class Lh{state={time:Date.now(),playing:!1,speedIdx:3,chapter:0,step:0,view:"earth",groundMode:"sphere",layers:{...xc},lat:39.9,lon:116.4,city:"北京",refraction:!0,chart:"declination",quality:Ch(),largeFont:Ia("largeFont",!1),hideUI:!1,beijing:Ia("beijing",!0),introDone:!1,panelOpen:!1,panelTab:"data",lessonOpen:window.innerWidth>760};listeners=new Set;get tz(){return this.state.beijing?8:0}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}set(t){const e=new Set;for(const n of Object.keys(t)){const s=t[n];if(n==="layers"){e.add(n),this.state.layers={...s};continue}this.state[n]!==s&&(this.state[n]=s,e.add(n))}e.size&&this.emit(e),e.has("quality")&&this.savePref("quality",this.state.quality),e.has("largeFont")&&this.savePref("largeFont",this.state.largeFont),e.has("beijing")&&this.savePref("beijing",this.state.beijing)}setLayer(t,e){this.state.layers[t]!==e&&this.set({layers:{...this.state.layers,[t]:e}})}toggleLayer(t){this.setLayer(t,!this.state.layers[t])}emit(t){for(const e of[...this.listeners])e(t,this.state)}savePref(t,e){try{localStorage.setItem("eim:"+t,JSON.stringify(e))}catch{}}}const st=new Lh;let Mr=null;function Ph(i){Mr=i}function wo(){return Mr}function Dh(i){const t=st.tz,e=st.state.time,n=He(e,t);return"now"in i?Date.now():"md"in i?vr(n.year,i.md[0],i.md[1],i.hour??12,i.minute??0,t):"event"in i?Mc(i.event,n.year):vr(n.year,n.month,n.day,0,0,t)+i.hourOfDay*36e5}function Mc(i,t){const e=t??He(st.state.time,st.tz).year;return ts(e)[i]}function Ao(i){st.set({time:i})}function Uh(i){const t=_c(i);t&&st.set({city:t.name,lat:t.lat,lon:t.lon})}function Ih(i,t){st.set({lat:Math.max(-90,Math.min(90,i)),lon:t,city:""})}function Na(i){const t={};if(i.layers){const e=new Set([...i.layers,"stars","labels"]),n={};for(const s of mr)n[s]=e.has(s);t.layers=n}if(i.view&&(t.view=i.view),i.groundMode&&(t.groundMode=i.groundMode),i.chart&&(t.chart=i.chart),i.speed!==void 0&&(t.speedIdx=Math.max(0,Math.min(Za.length-1,i.speed))),i.play!==void 0&&(t.playing=i.play),i.city){const e=_c(i.city);e&&(t.city=e.name,t.lat=e.lat,t.lon=e.lon)}i.lat!==void 0&&(t.lat=i.lat,t.city=""),i.lon!==void 0&&(t.lon=i.lon,t.city=""),i.openData&&(t.panelOpen=!0,t.panelTab="data"),i.time&&(t.time=Dh(i.time)),st.set(t),i.focus&&Mr&&Mr.setFocus(i.focus)}function ci(i,t,e=!0){const n=Math.max(0,Math.min(mn.length-1,i)),s=Math.max(0,Math.min(mn[n].steps.length-1,t));st.set({chapter:n,step:s}),e&&Na(mn[n].steps[s].setup)}function Ro(i){const t=st.state.lessonOpen;ci(i,0),t||st.set({lessonOpen:!0})}function yc(){const{chapter:i,step:t}=st.state,e=mn[i];t<e.steps.length-1?ci(i,t+1):i<mn.length-1&&ci(i+1,0)}function Sc(){const{chapter:i,step:t}=st.state;t>0?ci(i,t-1):i>0&&ci(i-1,mn[i-1].steps.length-1)}function bc(){st.set({playing:!st.state.playing})}function Fs(i){const t={...st.state.layers},e=i==="orbit"?["orbit","monthTicks","seasons"]:i==="ground"?["todayPath","gnomon","altazGrid"]:[],n=i==="orbit"?["orbit","monthTicks","seasons","apsides"]:i==="ground"?["todayPath","seasonPaths","analemma","gnomon","altazGrid","celestialEq"]:[];if(e.length&&!n.some(s=>t[s]))for(const s of e)t[s]=!0;st.set({view:i,layers:t})}function Ec(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}function rs(i){const t=st.state;t.panelOpen&&t.panelTab===i?st.set({panelOpen:!1}):st.set({panelOpen:!0,panelTab:i})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ja="160",gi={ROTATE:0,DOLLY:1,PAN:2},_i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Nh=0,Co=1,Fh=2,Tc=1,Oh=2,En=3,qn=0,Ae=1,ze=2,Vn=0,Xi=1,Yi=2,Lo=3,Po=4,zh=5,ei=100,Bh=101,kh=102,Do=103,Uo=104,Gh=200,Hh=201,Vh=202,Wh=203,Fa=204,Oa=205,Xh=206,qh=207,Yh=208,$h=209,jh=210,Kh=211,Zh=212,Jh=213,Qh=214,tu=0,eu=1,nu=2,yr=3,iu=4,su=5,ru=6,au=7,Qa=0,ou=1,lu=2,Wn=0,cu=1,hu=2,uu=3,du=4,fu=5,pu=6,wc=300,$i=301,ji=302,za=303,Ba=304,Lr=306,Ki=1e3,on=1001,ka=1002,Oe=1003,Io=1004,Wr=1005,De=1006,mu=1007,ys=1008,Xn=1009,gu=1010,_u=1011,to=1012,Ac=1013,Bn=1014,kn=1015,Ss=1016,Rc=1017,Cc=1018,si=1020,vu=1021,ln=1023,xu=1024,Mu=1025,ri=1026,Zi=1027,yu=1028,Lc=1029,Su=1030,Pc=1031,Dc=1033,Xr=33776,qr=33777,Yr=33778,$r=33779,No=35840,Fo=35841,Oo=35842,zo=35843,Uc=36196,Bo=37492,ko=37496,Go=37808,Ho=37809,Vo=37810,Wo=37811,Xo=37812,qo=37813,Yo=37814,$o=37815,jo=37816,Ko=37817,Zo=37818,Jo=37819,Qo=37820,tl=37821,jr=36492,el=36494,nl=36495,bu=36283,il=36284,sl=36285,rl=36286,Ic=3e3,ai=3001,Eu=3200,Tu=3201,eo=0,wu=1,tn="",ue="srgb",Rn="srgb-linear",no="display-p3",Pr="display-p3-linear",Sr="linear",le="srgb",br="rec709",Er="p3",vi=7680,al=519,Au=512,Ru=513,Cu=514,Nc=515,Lu=516,Pu=517,Du=518,Uu=519,Ga=35044,ol="300 es",Ha=1035,wn=2e3,Tr=2001;class di{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ll=1234567;const _s=Math.PI/180,bs=180/Math.PI;function An(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Ue(i,t,e){return Math.max(t,Math.min(e,i))}function io(i,t){return(i%t+t)%t}function Iu(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Nu(i,t,e){return i!==t?(e-i)/(t-i):0}function vs(i,t,e){return(1-e)*i+e*t}function Fu(i,t,e,n){return vs(i,t,1-Math.exp(-e*n))}function Ou(i,t=1){return t-Math.abs(io(i,t*2)-t)}function zu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Bu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ku(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Gu(i,t){return i+Math.random()*(t-i)}function Hu(i){return i*(.5-Math.random())}function Vu(i){i!==void 0&&(ll=i);let t=ll+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Wu(i){return i*_s}function Xu(i){return i*bs}function Va(i){return(i&i-1)===0&&i!==0}function qu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function wr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yu(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),f=a((t-n)/2),m=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*m,o*c);break;case"YXY":i.set(l*m,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function fn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const On={DEG2RAD:_s,RAD2DEG:bs,generateUUID:An,clamp:Ue,euclideanModulo:io,mapLinear:Iu,inverseLerp:Nu,lerp:vs,damp:Fu,pingpong:Ou,smoothstep:zu,smootherstep:Bu,randInt:ku,randFloat:Gu,randFloatSpread:Hu,seededRandom:Vu,degToRad:Wu,radToDeg:Xu,isPowerOfTwo:Va,ceilPowerOfTwo:qu,floorPowerOfTwo:wr,setQuaternionFromProperEuler:Yu,normalize:re,denormalize:fn};class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,s,r,a,o,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],u=s[6],M=s[1],v=s[4],x=s[7],L=s[2],T=s[5],A=s[8];return r[0]=a*_+o*M+l*L,r[3]=a*p+o*v+l*T,r[6]=a*u+o*x+l*A,r[1]=c*_+h*M+d*L,r[4]=c*p+h*v+d*T,r[7]=c*u+h*x+d*A,r[2]=f*_+m*M+g*L,r[5]=f*p+m*v+g*T,r[8]=f*u+m*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,f=o*l-h*r,m=c*r-a*l,g=e*d+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Kr.makeScale(t,e)),this}rotate(t){return this.premultiply(Kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new $t;function Fc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $u(){const i=Es("canvas");return i.style.display="block",i}const cl={};function xs(i){i in cl||(cl[i]=!0,console.warn(i))}const hl=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ul=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Os={[Rn]:{transfer:Sr,primaries:br,toReference:i=>i,fromReference:i=>i},[ue]:{transfer:le,primaries:br,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Pr]:{transfer:Sr,primaries:Er,toReference:i=>i.applyMatrix3(ul),fromReference:i=>i.applyMatrix3(hl)},[no]:{transfer:le,primaries:Er,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ul),fromReference:i=>i.applyMatrix3(hl).convertLinearToSRGB()}},ju=new Set([Rn,Pr]),ae={enabled:!0,_workingColorSpace:Rn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!ju.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Os[t].toReference,s=Os[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Os[i].primaries},getTransfer:function(i){return i===tn?Sr:Os[i].transfer}};function qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xi;class Oc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{xi===void 0&&(xi=Es("canvas")),xi.width=t.width,xi.height=t.height;const n=xi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=xi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Es("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qi(e[n]/255)*255):e[n]=qi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ku=0;class zc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=An(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Jr(s[a].image)):r.push(Jr(s[a]))}else r=Jr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Oc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zu=0;class Be extends di{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=on,s=on,r=De,a=ys,o=ln,l=Xn,c=Be.DEFAULT_ANISOTROPY,h=tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=An(),this.name="",this.source=new zc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ai?ue:tn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ki:t.x=t.x-Math.floor(t.x);break;case on:t.x=t.x<0?0:1;break;case ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ki:t.y=t.y-Math.floor(t.y);break;case on:t.y=t.y<0?0:1;break;case ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ue?ai:Ic}set encoding(t){xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===ai?ue:tn}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=wc;Be.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,n=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,x=(m+1)/2,L=(u+1)/2,T=(h+f)/4,A=(d+_)/4,z=(g+p)/4;return v>x&&v>L?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=A/n):x>L?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=z/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=z/r),this.set(n,s,r,e),this}let M=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(d-_)/M,this.z=(f-h)/M,this.w=Math.acos((c+m+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ju extends di{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:1};n.encoding!==void 0&&(xs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ai?ue:tn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Be(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new zc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends Ju{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Bc extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=on,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qu extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=on,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==f||c!==m||h!==g){let p=1-o;const u=l*f+c*m+h*g+d*_,M=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){const L=Math.sqrt(v),T=Math.atan2(L,u*M);p=Math.sin(p*T)/L,o=Math.sin(o*T)/L}const x=o*M;if(l=l*p+f*x,c=c*p+m*x,h=h*p+g*x,d=d*p+_*x,p===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=L,c*=L,h*=L,d*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*m-c*f,t[e+1]=l*g+h*f+c*d-o*m,t[e+2]=c*g+h*m+o*f-l*d,t[e+3]=h*g-o*d-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"YZX":this._x=f*h*d+c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d-f*m*g;break;case"XZY":this._x=f*h*d-c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class R{constructor(t=0,e=0,n=0){R.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qr.copy(this).projectOnVector(t),this.sub(Qr)}reflect(t){return this.sub(Qr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new R,dl=new Yn;class Rs{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,en):en.fromBufferAttribute(r,a),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(t.matrixWorld),this.union(zs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(as),Bs.subVectors(this.max,as),Mi.subVectors(t.a,as),yi.subVectors(t.b,as),Si.subVectors(t.c,as),Pn.subVectors(yi,Mi),Dn.subVectors(Si,yi),Kn.subVectors(Mi,Si);let e=[0,-Pn.z,Pn.y,0,-Dn.z,Dn.y,0,-Kn.z,Kn.y,Pn.z,0,-Pn.x,Dn.z,0,-Dn.x,Kn.z,0,-Kn.x,-Pn.y,Pn.x,0,-Dn.y,Dn.x,0,-Kn.y,Kn.x,0];return!ta(e,Mi,yi,Si,Bs)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,Mi,yi,Si,Bs))?!1:(ks.crossVectors(Pn,Dn),e=[ks.x,ks.y,ks.z],ta(e,Mi,yi,Si,Bs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const vn=[new R,new R,new R,new R,new R,new R,new R,new R],en=new R,zs=new Rs,Mi=new R,yi=new R,Si=new R,Pn=new R,Dn=new R,Kn=new R,as=new R,Bs=new R,ks=new R,Zn=new R;function ta(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zn.fromArray(i,r);const o=s.x*Math.abs(Zn.x)+s.y*Math.abs(Zn.y)+s.z*Math.abs(Zn.z),l=t.dot(Zn),c=e.dot(Zn),h=n.dot(Zn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const td=new Rs,os=new R,ea=new R;class Cs{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):td.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;os.subVectors(t,this.center);const e=os.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(os,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(os.copy(t.center).add(ea)),this.expandByPoint(os.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new R,na=new R,Gs=new R,Un=new R,ia=new R,Hs=new R,sa=new R;class Ls{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){na.copy(t).add(e).multiplyScalar(.5),Gs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(na);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Gs),o=Un.dot(this.direction),l=-Un.dot(Gs),c=Un.lengthSq(),h=Math.abs(1-a*a);let d,f,m,g;if(h>0)if(d=a*l-o,f=a*o-l,g=r*h,d>=0)if(f>=-g)if(f<=g){const _=1/h;d*=_,f*=_,m=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(na).addScaledVector(Gs,f),m}intersectSphere(t,e){xn.subVectors(t.center,this.origin);const n=xn.dot(this.direction),s=xn.dot(xn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,s,r){ia.subVectors(e,t),Hs.subVectors(n,t),sa.crossVectors(ia,Hs);let a=this.direction.dot(sa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Un.subVectors(this.origin,t);const l=o*this.direction.dot(Hs.crossVectors(Un,Hs));if(l<0)return null;const c=o*this.direction.dot(ia.cross(Un));if(c<0||l+c>a)return null;const h=-o*Un.dot(sa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,s,r,a,o,l,c,h,d,f,m,g,_,p){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,f,m,g,_,p)}set(t,e,n,s,r,a,o,l,c,h,d,f,m,g,_,p){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/bi.setFromMatrixColumn(t,0).length(),r=1/bi.setFromMatrixColumn(t,1).length(),a=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=a*h,m=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,m=l*d,g=c*h,_=c*d;e[0]=f+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,m=l*d,g=c*h,_=c*d;e[0]=f-_*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,m=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=f*c+_,e[1]=l*d,e[5]=_*c+f,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*d,e[8]=g*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=f-_*d}else if(t.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=f*d+_,e[5]=a*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=_*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ed,t,nd)}lookAt(t,e,n){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),In.crossVectors(n,qe),In.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),In.crossVectors(n,qe)),In.normalize(),Vs.crossVectors(qe,In),s[0]=In.x,s[4]=Vs.x,s[8]=qe.x,s[1]=In.y,s[5]=Vs.y,s[9]=qe.y,s[2]=In.z,s[6]=Vs.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],M=n[3],v=n[7],x=n[11],L=n[15],T=s[0],A=s[4],z=s[8],S=s[12],w=s[1],W=s[5],I=s[9],j=s[13],P=s[2],F=s[6],D=s[10],q=s[14],N=s[3],$=s[7],K=s[11],J=s[15];return r[0]=a*T+o*w+l*P+c*N,r[4]=a*A+o*W+l*F+c*$,r[8]=a*z+o*I+l*D+c*K,r[12]=a*S+o*j+l*q+c*J,r[1]=h*T+d*w+f*P+m*N,r[5]=h*A+d*W+f*F+m*$,r[9]=h*z+d*I+f*D+m*K,r[13]=h*S+d*j+f*q+m*J,r[2]=g*T+_*w+p*P+u*N,r[6]=g*A+_*W+p*F+u*$,r[10]=g*z+_*I+p*D+u*K,r[14]=g*S+_*j+p*q+u*J,r[3]=M*T+v*w+x*P+L*N,r[7]=M*A+v*W+x*F+L*$,r[11]=M*z+v*I+x*D+L*K,r[15]=M*S+v*j+x*q+L*J,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],f=t[10],m=t[14],g=t[3],_=t[7],p=t[11],u=t[15];return g*(+r*l*d-s*c*d-r*o*f+n*c*f+s*o*m-n*l*m)+_*(+e*l*m-e*c*f+r*a*f-s*a*m+s*c*h-r*l*h)+p*(+e*c*d-e*o*m-r*a*d+n*a*m+r*o*h-n*c*h)+u*(-s*o*h-e*l*d+e*o*f+s*a*d-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],f=t[10],m=t[11],g=t[12],_=t[13],p=t[14],u=t[15],M=d*p*c-_*f*c+_*l*m-o*p*m-d*l*u+o*f*u,v=g*f*c-h*p*c-g*l*m+a*p*m+h*l*u-a*f*u,x=h*_*c-g*d*c+g*o*m-a*_*m-h*o*u+a*d*u,L=g*d*l-h*_*l-g*o*f+a*_*f+h*o*p-a*d*p,T=e*M+n*v+s*x+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=M*A,t[1]=(_*f*r-d*p*r-_*s*m+n*p*m+d*s*u-n*f*u)*A,t[2]=(o*p*r-_*l*r+_*s*c-n*p*c-o*s*u+n*l*u)*A,t[3]=(d*l*r-o*f*r-d*s*c+n*f*c+o*s*m-n*l*m)*A,t[4]=v*A,t[5]=(h*p*r-g*f*r+g*s*m-e*p*m-h*s*u+e*f*u)*A,t[6]=(g*l*r-a*p*r-g*s*c+e*p*c+a*s*u-e*l*u)*A,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*m+e*l*m)*A,t[8]=x*A,t[9]=(g*d*r-h*_*r-g*n*m+e*_*m+h*n*u-e*d*u)*A,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*u+e*o*u)*A,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*m-e*o*m)*A,t[12]=L*A,t[13]=(h*_*s-g*d*s+g*n*f-e*_*f-h*n*p+e*d*p)*A,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*p-e*o*p)*A,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,f=r*c,m=r*h,g=r*d,_=a*h,p=a*d,u=o*d,M=l*c,v=l*h,x=l*d,L=n.x,T=n.y,A=n.z;return s[0]=(1-(_+u))*L,s[1]=(m+x)*L,s[2]=(g-v)*L,s[3]=0,s[4]=(m-x)*T,s[5]=(1-(f+u))*T,s[6]=(p+M)*T,s[7]=0,s[8]=(g+v)*A,s[9]=(p-M)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=bi.set(s[0],s[1],s[2]).length();const a=bi.set(s[4],s[5],s[6]).length(),o=bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],nn.copy(this);const c=1/r,h=1/a,d=1/o;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=d,nn.elements[9]*=d,nn.elements[10]*=d,e.setFromRotationMatrix(nn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=wn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,g;if(o===wn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Tr)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=wn){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),f=(e+t)*c,m=(n+s)*h;let g,_;if(o===wn)g=(a+r)*d,_=-2*d;else if(o===Tr)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new R,nn=new ce,ed=new R(0,0,0),nd=new R(1,1,1),In=new R,Vs=new R,qe=new R,fl=new ce,pl=new Yn;class Dr{constructor(t=0,e=0,n=0,s=Dr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ue(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return fl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pl.setFromEuler(this),this.setFromQuaternion(pl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dr.DEFAULT_ORDER="XYZ";class so{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let id=0;const ml=new R,Ei=new Yn,Mn=new ce,Ws=new R,ls=new R,sd=new R,rd=new Yn,gl=new R(1,0,0),_l=new R(0,1,0),vl=new R(0,0,1),ad={type:"added"},od={type:"removed"};class xe extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new R,e=new Dr,n=new Yn,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new $t}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new so,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(gl,t)}rotateY(t){return this.rotateOnAxis(_l,t)}rotateZ(t){return this.rotateOnAxis(vl,t)}translateOnAxis(t,e){return ml.copy(t).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gl,t)}translateY(t){return this.translateOnAxis(_l,t)}translateZ(t){return this.translateOnAxis(vl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ws.copy(t):Ws.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(ls,Ws,this.up):Mn.lookAt(Ws,ls,this.up),this.quaternion.setFromRotationMatrix(Mn),s&&(Mn.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(Mn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(ad)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(od)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Mn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,sd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,rd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),f=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}xe.DEFAULT_UP=new R(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new R,yn=new R,ra=new R,Sn=new R,Ti=new R,wi=new R,xl=new R,aa=new R,oa=new R,la=new R;let Xs=!1;class Je{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),sn.subVectors(t,e),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){sn.subVectors(s,e),yn.subVectors(n,e),ra.subVectors(t,e);const a=sn.dot(sn),o=sn.dot(yn),l=sn.dot(ra),c=yn.dot(yn),h=yn.dot(ra),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getUV(t,e,n,s,r,a,o,l){return Xs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Xs=!0),this.getInterpolation(t,e,n,s,r,a,o,l)}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static isFrontFacing(t,e,n,s){return sn.subVectors(n,e),yn.subVectors(t,e),sn.cross(yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return sn.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),sn.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Je.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return Xs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Xs=!0),Je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return Je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ti.subVectors(s,n),wi.subVectors(r,n),aa.subVectors(t,n);const l=Ti.dot(aa),c=wi.dot(aa);if(l<=0&&c<=0)return e.copy(n);oa.subVectors(t,s);const h=Ti.dot(oa),d=wi.dot(oa);if(h>=0&&d<=h)return e.copy(s);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ti,a);la.subVectors(t,r);const m=Ti.dot(la),g=wi.dot(la);if(g>=0&&m<=g)return e.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(wi,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return xl.subVectors(r,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(xl,o);const u=1/(p+_+f);return a=_*u,o=f*u,e.copy(n).addScaledVector(Ti,a).addScaledVector(wi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},qs={h:0,s:0,l:0};function ca(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=io(t,1),e=Ue(e,0,1),n=Ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ca(a,r,t+1/3),this.g=ca(a,r,t),this.b=ca(a,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ue){const n=kc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}copyLinearToSRGB(t){return this.r=Zr(t.r),this.g=Zr(t.g),this.b=Zr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ue){return ae.fromWorkingColorSpace(Le.copy(this),t),Math.round(Ue(Le.r*255,0,255))*65536+Math.round(Ue(Le.g*255,0,255))*256+Math.round(Ue(Le.b*255,0,255))}getHexString(t=ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,s=Le.g,r=Le.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=ue){ae.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,s=Le.b;return t!==ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(qs);const n=vs(Nn.h,qs.h,e),s=vs(Nn.s,qs.s,e),r=vs(Nn.l,qs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new zt;zt.NAMES=kc;let ld=0;class Ln extends di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=An(),this.name="",this.type="Material",this.blending=Xi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Oa,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fa&&(n.blendSrc=this.blendSrc),this.blendDst!==Oa&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==yr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==al&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ve extends Ln{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new R,Ys=new Et;class Ie{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ga,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ys.fromBufferAttribute(this,e),Ys.applyMatrix3(t),this.setXY(e,Ys.x,Ys.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ga&&(t.usage=this.usage),t}}class Gc extends Ie{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Hc extends Ie{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends Ie{constructor(t,e,n){super(new Float32Array(t),e,n)}}let cd=0;const Ze=new ce,ha=new xe,Ai=new R,Ye=new Rs,cs=new Rs,Ee=new R;class se extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fc(t)?Hc:Gc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return ha.lookAt(t),ha.updateMatrix(),this.applyMatrix4(ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors(Ye.min,cs.min),Ye.expandByPoint(Ee),Ee.addVectors(Ye.max,cs.max),Ye.expandByPoint(Ee)):(Ye.expandByPoint(cs.min),Ye.expandByPoint(cs.max))}Ye.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ee.fromBufferAttribute(o,c),l&&(Ai.fromBufferAttribute(t,c),Ee.add(Ai)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ie(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<o;w++)c[w]=new R,h[w]=new R;const d=new R,f=new R,m=new R,g=new Et,_=new Et,p=new Et,u=new R,M=new R;function v(w,W,I){d.fromArray(s,w*3),f.fromArray(s,W*3),m.fromArray(s,I*3),g.fromArray(a,w*2),_.fromArray(a,W*2),p.fromArray(a,I*2),f.sub(d),m.sub(d),_.sub(g),p.sub(g);const j=1/(_.x*p.y-p.x*_.y);isFinite(j)&&(u.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(j),M.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(j),c[w].add(u),c[W].add(u),c[I].add(u),h[w].add(M),h[W].add(M),h[I].add(M))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let w=0,W=x.length;w<W;++w){const I=x[w],j=I.start,P=I.count;for(let F=j,D=j+P;F<D;F+=3)v(n[F+0],n[F+1],n[F+2])}const L=new R,T=new R,A=new R,z=new R;function S(w){A.fromArray(r,w*3),z.copy(A);const W=c[w];L.copy(W),L.sub(A.multiplyScalar(A.dot(W))).normalize(),T.crossVectors(z,W);const j=T.dot(h[w])<0?-1:1;l[w*4]=L.x,l[w*4+1]=L.y,l[w*4+2]=L.z,l[w*4+3]=j}for(let w=0,W=x.length;w<W;++w){const I=x[w],j=I.start,P=I.count;for(let F=j,D=j+P;F<D;F+=3)S(n[F+0]),S(n[F+1]),S(n[F+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ie(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,d=new R;if(t)for(let f=0,m=t.count;f<m;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let u=0;u<h;u++)f[g++]=c[m++]}return new Ie(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new se,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=t(f,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ml=new ce,Jn=new Ls,$s=new Cs,yl=new R,Ri=new R,Ci=new R,Li=new R,ua=new R,js=new R,Ks=new Et,Zs=new Et,Js=new Et,Sl=new R,bl=new R,El=new R,Qs=new R,tr=new R;class jt extends xe{constructor(t=new se,e=new ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){js.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(ua.fromBufferAttribute(d,t),a?js.addScaledVector(ua,h):js.addScaledVector(ua.sub(e),h))}e.add(js)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(r),Jn.copy(t.ray).recast(t.near),!($s.containsPoint(Jn.origin)===!1&&(Jn.intersectSphere($s,yl)===null||Jn.origin.distanceToSquared(yl)>(t.far-t.near)**2))&&(Ml.copy(r).invert(),Jn.copy(t.ray).applyMatrix4(Ml),!(n.boundingBox!==null&&Jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Jn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],M=Math.max(p.start,m.start),v=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let x=M,L=v;x<L;x+=3){const T=o.getX(x),A=o.getX(x+1),z=o.getX(x+2);s=er(this,u,t,n,c,h,d,T,A,z),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const M=o.getX(p),v=o.getX(p+1),x=o.getX(p+2);s=er(this,a,t,n,c,h,d,M,v,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],M=Math.max(p.start,m.start),v=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let x=M,L=v;x<L;x+=3){const T=x,A=x+1,z=x+2;s=er(this,u,t,n,c,h,d,T,A,z),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const M=p,v=p+1,x=p+2;s=er(this,a,t,n,c,h,d,M,v,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function hd(i,t,e,n,s,r,a,o){let l;if(t.side===Ae?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===qn,o),l===null)return null;tr.copy(o),tr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(tr);return c<e.near||c>e.far?null:{distance:c,point:tr.clone(),object:i}}function er(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ri),i.getVertexPosition(l,Ci),i.getVertexPosition(c,Li);const h=hd(i,t,e,n,Ri,Ci,Li,Qs);if(h){s&&(Ks.fromBufferAttribute(s,o),Zs.fromBufferAttribute(s,l),Js.fromBufferAttribute(s,c),h.uv=Je.getInterpolation(Qs,Ri,Ci,Li,Ks,Zs,Js,new Et)),r&&(Ks.fromBufferAttribute(r,o),Zs.fromBufferAttribute(r,l),Js.fromBufferAttribute(r,c),h.uv1=Je.getInterpolation(Qs,Ri,Ci,Li,Ks,Zs,Js,new Et),h.uv2=h.uv1),a&&(Sl.fromBufferAttribute(a,o),bl.fromBufferAttribute(a,l),El.fromBufferAttribute(a,c),h.normal=Je.getInterpolation(Qs,Ri,Ci,Li,Sl,bl,El,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new R,materialIndex:0};Je.getNormal(Ri,Ci,Li,d.normal),h.face=d}return h}class Ps extends se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(d,2));function g(_,p,u,M,v,x,L,T,A,z,S){const w=x/A,W=L/z,I=x/2,j=L/2,P=T/2,F=A+1,D=z+1;let q=0,N=0;const $=new R;for(let K=0;K<D;K++){const J=K*W-j;for(let rt=0;rt<F;rt++){const Y=rt*w-I;$[_]=Y*M,$[p]=J*v,$[u]=P,c.push($.x,$.y,$.z),$[_]=0,$[p]=0,$[u]=T>0?1:-1,h.push($.x,$.y,$.z),d.push(rt/A),d.push(1-K/z),q+=1}}for(let K=0;K<z;K++)for(let J=0;J<A;J++){const rt=f+J+F*K,Y=f+J+F*(K+1),Z=f+(J+1)+F*(K+1),ht=f+(J+1)+F*K;l.push(rt,Y,ht),l.push(Y,Z,ht),N+=6}o.addGroup(m,N,S),m+=N,f+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ji(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Ji(i[e]);for(const s in n)t[s]=n[s]}return t}function ud(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vc(i){return i.getRenderTarget()===null?i.outputColorSpace:ae.workingColorSpace}const dd={clone:Ji,merge:Fe};var fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class je extends Ln{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fd,this.fragmentShader=pd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ji(t.uniforms),this.uniformsGroups=ud(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Wc extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Qe extends Wc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(_s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(_s*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Pi=-90,Di=1;class md extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Qe(Pi,Di,t,e);s.layers=this.layers,this.add(s);const r=new Qe(Pi,Di,t,e);r.layers=this.layers,this.add(r);const a=new Qe(Pi,Di,t,e);a.layers=this.layers,this.add(a);const o=new Qe(Pi,Di,t,e);o.layers=this.layers,this.add(o);const l=new Qe(Pi,Di,t,e);l.layers=this.layers,this.add(l);const c=new Qe(Pi,Di,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,f,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Xc extends Be{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:$i,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class gd extends hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(xs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===ai?ue:tn),this.texture=new Xc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:De}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ps(5,5,5),r=new je({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:Vn});r.uniforms.tEquirect.value=e;const a=new jt(s,r),o=e.minFilter;return e.minFilter===ys&&(e.minFilter=De),new md(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const da=new R,_d=new R,vd=new $t;class zn{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=da.subVectors(n,e).cross(_d.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(da),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||vd.getNormalMatrix(t),s=this.coplanarPoint(da).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new Cs,nr=new R;class ro{constructor(t=new zn,e=new zn,n=new zn,s=new zn,r=new zn,a=new zn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],u=s[12],M=s[13],v=s[14],x=s[15];if(n[0].setComponents(l-r,f-c,p-m,x-u).normalize(),n[1].setComponents(l+r,f+c,p+m,x+u).normalize(),n[2].setComponents(l+a,f+h,p+g,x+M).normalize(),n[3].setComponents(l-a,f-h,p-g,x-M).normalize(),n[4].setComponents(l-o,f-d,p-_,x-v).normalize(),e===wn)n[5].setComponents(l+o,f+d,p+_,x+v).normalize();else if(e===Tr)n[5].setComponents(o,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){return Qn.center.set(0,0,0),Qn.radius=.7071067811865476,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(nr.x=s.normal.x>0?t.max.x:t.min.x,nr.y=s.normal.y>0?t.max.y:t.min.y,nr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(nr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function xd(i,t){const e=t.isWebGL2,n=new WeakMap;function s(c,h){const d=c.array,f=c.usage,m=d.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,d,f),c.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,d){const f=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(d,c),m.count===-1&&g.length===0&&i.bufferSubData(d,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const u=g[_];e?i.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}m.count!==-1&&(e?i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}class Ur extends se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,f=e/l,m=[],g=[],_=[],p=[];for(let u=0;u<h;u++){const M=u*f-a;for(let v=0;v<c;v++){const x=v*d-r;g.push(x,-M,0),_.push(0,0,1),p.push(v/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let M=0;M<o;M++){const v=M+c*u,x=M+c*(u+1),L=M+1+c*(u+1),T=M+1+c*u;m.push(v,x,T),m.push(x,L,T)}this.setIndex(m),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.width,t.height,t.widthSegments,t.heightSegments)}}var Md=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ad=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rd=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ud=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Id=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Vd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Jd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Qd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,af=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,of=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ff=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,mf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_f=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Mf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Df=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,If=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ff=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,zf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Bf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Kf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ap=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,op=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ap=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Rp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Cp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Up=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ip=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Op=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Bp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Hp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Xp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:Md,alphahash_pars_fragment:yd,alphamap_fragment:Sd,alphamap_pars_fragment:bd,alphatest_fragment:Ed,alphatest_pars_fragment:Td,aomap_fragment:wd,aomap_pars_fragment:Ad,batching_pars_vertex:Rd,batching_vertex:Cd,begin_vertex:Ld,beginnormal_vertex:Pd,bsdfs:Dd,iridescence_fragment:Ud,bumpmap_pars_fragment:Id,clipping_planes_fragment:Nd,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Od,clipping_planes_vertex:zd,color_fragment:Bd,color_pars_fragment:kd,color_pars_vertex:Gd,color_vertex:Hd,common:Vd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:Xd,displacementmap_pars_vertex:qd,displacementmap_vertex:Yd,emissivemap_fragment:$d,emissivemap_pars_fragment:jd,colorspace_fragment:Kd,colorspace_pars_fragment:Zd,envmap_fragment:Jd,envmap_common_pars_fragment:Qd,envmap_pars_fragment:tf,envmap_pars_vertex:ef,envmap_physical_pars_fragment:pf,envmap_vertex:nf,fog_vertex:sf,fog_pars_vertex:rf,fog_fragment:af,fog_pars_fragment:of,gradientmap_pars_fragment:lf,lightmap_fragment:cf,lightmap_pars_fragment:hf,lights_lambert_fragment:uf,lights_lambert_pars_fragment:df,lights_pars_begin:ff,lights_toon_fragment:mf,lights_toon_pars_fragment:gf,lights_phong_fragment:_f,lights_phong_pars_fragment:vf,lights_physical_fragment:xf,lights_physical_pars_fragment:Mf,lights_fragment_begin:yf,lights_fragment_maps:Sf,lights_fragment_end:bf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:Tf,logdepthbuf_pars_vertex:wf,logdepthbuf_vertex:Af,map_fragment:Rf,map_pars_fragment:Cf,map_particle_fragment:Lf,map_particle_pars_fragment:Pf,metalnessmap_fragment:Df,metalnessmap_pars_fragment:Uf,morphcolor_vertex:If,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:zf,normal_fragment_maps:Bf,normal_pars_fragment:kf,normal_pars_vertex:Gf,normal_vertex:Hf,normalmap_pars_fragment:Vf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:Xf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Yf,opaque_fragment:$f,packing:jf,premultiplied_alpha_fragment:Kf,project_vertex:Zf,dithering_fragment:Jf,dithering_pars_fragment:Qf,roughnessmap_fragment:tp,roughnessmap_pars_fragment:ep,shadowmap_pars_fragment:np,shadowmap_pars_vertex:ip,shadowmap_vertex:sp,shadowmask_pars_fragment:rp,skinbase_vertex:ap,skinning_pars_vertex:op,skinning_vertex:lp,skinnormal_vertex:cp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:dp,tonemapping_pars_fragment:fp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:_p,uv_vertex:vp,worldpos_vertex:xp,background_vert:Mp,background_frag:yp,backgroundCube_vert:Sp,backgroundCube_frag:bp,cube_vert:Ep,cube_frag:Tp,depth_vert:wp,depth_frag:Ap,distanceRGBA_vert:Rp,distanceRGBA_frag:Cp,equirect_vert:Lp,equirect_frag:Pp,linedashed_vert:Dp,linedashed_frag:Up,meshbasic_vert:Ip,meshbasic_frag:Np,meshlambert_vert:Fp,meshlambert_frag:Op,meshmatcap_vert:zp,meshmatcap_frag:Bp,meshnormal_vert:kp,meshnormal_frag:Gp,meshphong_vert:Hp,meshphong_frag:Vp,meshphysical_vert:Wp,meshphysical_frag:Xp,meshtoon_vert:qp,meshtoon_frag:Yp,points_vert:$p,points_frag:jp,shadow_vert:Kp,shadow_frag:Zp,sprite_vert:Jp,sprite_frag:Qp},lt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},un={basic:{uniforms:Fe([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Fe([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Fe([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Fe([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Fe([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Fe([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Fe([lt.points,lt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Fe([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Fe([lt.common,lt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Fe([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Fe([lt.sprite,lt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Fe([lt.common,lt.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Fe([lt.lights,lt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};un.physical={uniforms:Fe([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const ir={r:0,b:0,g:0};function tm(i,t,e,n,s,r,a){const o=new zt(0);let l=r===!0?0:1,c,h,d=null,f=0,m=null;function g(p,u){let M=!1,v=u.isScene===!0?u.background:null;v&&v.isTexture&&(v=(u.backgroundBlurriness>0?e:t).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),M=!0);const x=i.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Lr)?(h===void 0&&(h=new jt(new Ps(1,1,1),new je({name:"BackgroundCubeMaterial",uniforms:Ji(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=ae.getTransfer(v.colorSpace)!==le,(d!==v||f!==v.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=v,f=v.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new jt(new Ur(2,2),new je({name:"BackgroundMaterial",uniforms:Ji(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=ae.getTransfer(v.colorSpace)!==le,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,f=v.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,u){p.getRGB(ir,Vc(i)),n.buffers.color.setClear(ir.r,ir.g,ir.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),l=u,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function em(i,t,e,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=p(null);let c=l,h=!1;function d(P,F,D,q,N){let $=!1;if(a){const K=_(q,D,F);c!==K&&(c=K,m(c.object)),$=u(P,q,D,N),$&&M(P,q,D,N)}else{const K=F.wireframe===!0;(c.geometry!==q.id||c.program!==D.id||c.wireframe!==K)&&(c.geometry=q.id,c.program=D.id,c.wireframe=K,$=!0)}N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),($||h)&&(h=!1,z(P,F,D,q),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(P){return n.isWebGL2?i.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?i.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function _(P,F,D){const q=D.wireframe===!0;let N=o[P.id];N===void 0&&(N={},o[P.id]=N);let $=N[F.id];$===void 0&&($={},N[F.id]=$);let K=$[q];return K===void 0&&(K=p(f()),$[q]=K),K}function p(P){const F=[],D=[],q=[];for(let N=0;N<s;N++)F[N]=0,D[N]=0,q[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:D,attributeDivisors:q,object:P,attributes:{},index:null}}function u(P,F,D,q){const N=c.attributes,$=F.attributes;let K=0;const J=D.getAttributes();for(const rt in J)if(J[rt].location>=0){const Z=N[rt];let ht=$[rt];if(ht===void 0&&(rt==="instanceMatrix"&&P.instanceMatrix&&(ht=P.instanceMatrix),rt==="instanceColor"&&P.instanceColor&&(ht=P.instanceColor)),Z===void 0||Z.attribute!==ht||ht&&Z.data!==ht.data)return!0;K++}return c.attributesNum!==K||c.index!==q}function M(P,F,D,q){const N={},$=F.attributes;let K=0;const J=D.getAttributes();for(const rt in J)if(J[rt].location>=0){let Z=$[rt];Z===void 0&&(rt==="instanceMatrix"&&P.instanceMatrix&&(Z=P.instanceMatrix),rt==="instanceColor"&&P.instanceColor&&(Z=P.instanceColor));const ht={};ht.attribute=Z,Z&&Z.data&&(ht.data=Z.data),N[rt]=ht,K++}c.attributes=N,c.attributesNum=K,c.index=q}function v(){const P=c.newAttributes;for(let F=0,D=P.length;F<D;F++)P[F]=0}function x(P){L(P,0)}function L(P,F){const D=c.newAttributes,q=c.enabledAttributes,N=c.attributeDivisors;D[P]=1,q[P]===0&&(i.enableVertexAttribArray(P),q[P]=1),N[P]!==F&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,F),N[P]=F)}function T(){const P=c.newAttributes,F=c.enabledAttributes;for(let D=0,q=F.length;D<q;D++)F[D]!==P[D]&&(i.disableVertexAttribArray(D),F[D]=0)}function A(P,F,D,q,N,$,K){K===!0?i.vertexAttribIPointer(P,F,D,N,$):i.vertexAttribPointer(P,F,D,q,N,$)}function z(P,F,D,q){if(n.isWebGL2===!1&&(P.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const N=q.attributes,$=D.getAttributes(),K=F.defaultAttributeValues;for(const J in $){const rt=$[J];if(rt.location>=0){let Y=N[J];if(Y===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),Y!==void 0){const Z=Y.normalized,ht=Y.itemSize,vt=e.get(Y);if(vt===void 0)continue;const dt=vt.buffer,It=vt.type,Bt=vt.bytesPerElement,Ct=n.isWebGL2===!0&&(It===i.INT||It===i.UNSIGNED_INT||Y.gpuType===Ac);if(Y.isInterleavedBufferAttribute){const Kt=Y.data,G=Kt.stride,we=Y.offset;if(Kt.isInstancedInterleavedBuffer){for(let wt=0;wt<rt.locationSize;wt++)L(rt.location+wt,Kt.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Kt.meshPerAttribute*Kt.count)}else for(let wt=0;wt<rt.locationSize;wt++)x(rt.location+wt);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let wt=0;wt<rt.locationSize;wt++)A(rt.location+wt,ht/rt.locationSize,It,Z,G*Bt,(we+ht/rt.locationSize*wt)*Bt,Ct)}else{if(Y.isInstancedBufferAttribute){for(let Kt=0;Kt<rt.locationSize;Kt++)L(rt.location+Kt,Y.meshPerAttribute);P.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Kt=0;Kt<rt.locationSize;Kt++)x(rt.location+Kt);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let Kt=0;Kt<rt.locationSize;Kt++)A(rt.location+Kt,ht/rt.locationSize,It,Z,ht*Bt,ht/rt.locationSize*Kt*Bt,Ct)}}else if(K!==void 0){const Z=K[J];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(rt.location,Z);break;case 3:i.vertexAttrib3fv(rt.location,Z);break;case 4:i.vertexAttrib4fv(rt.location,Z);break;default:i.vertexAttrib1fv(rt.location,Z)}}}}T()}function S(){I();for(const P in o){const F=o[P];for(const D in F){const q=F[D];for(const N in q)g(q[N].object),delete q[N];delete F[D]}delete o[P]}}function w(P){if(o[P.id]===void 0)return;const F=o[P.id];for(const D in F){const q=F[D];for(const N in q)g(q[N].object),delete q[N];delete F[D]}delete o[P.id]}function W(P){for(const F in o){const D=o[F];if(D[P.id]===void 0)continue;const q=D[P.id];for(const N in q)g(q[N].object),delete q[N];delete D[P.id]}}function I(){j(),h=!0,c!==l&&(c=l,m(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:I,resetDefaultState:j,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:W,initAttributes:v,enableAttribute:x,disableUnusedAttributes:T}}function nm(i,t,e,n){const s=n.isWebGL2;let r;function a(h){r=h}function o(h,d){i.drawArrays(r,h,d),e.update(d,r,1)}function l(h,d,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,d,f),e.update(d,r,f)}function c(h,d,f){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(r,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function im(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,x=a||t.has("OES_texture_float"),L=v&&x,T=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:L,maxSamples:T}}function sm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new zn,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||s;return s=f,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const M=r?0:n,v=M*4;let x=u.clippingState||null;l.value=x,x=h(g,f,v,m);for(let L=0;L!==v;++L)x[L]=e[L];u.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const u=m+_*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<u)&&(p=new Float32Array(u));for(let v=0,x=m;v!==_;++v,x+=4)a.copy(d[v]).applyMatrix4(M,o),a.normal.toArray(p,x),p[x+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function rm(i){let t=new WeakMap;function e(a,o){return o===za?a.mapping=$i:o===Ba&&(a.mapping=ji),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===za||o===Ba)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new gd(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Yc extends Wc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Hi=4,Tl=[.125,.215,.35,.446,.526,.582],ni=20,fa=new Yc,wl=new zt;let pa=null,ma=0,ga=0;const ti=(1+Math.sqrt(5))/2,Ui=1/ti,Al=[new R(1,1,1),new R(-1,1,1),new R(1,1,-1),new R(-1,1,-1),new R(0,ti,Ui),new R(0,ti,-Ui),new R(Ui,0,ti),new R(-Ui,0,ti),new R(ti,Ui,0),new R(-ti,Ui,0)];class Rl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(pa,ma,ga),t.scissorTest=!1,sr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===$i||t.mapping===ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),pa=this._renderer.getRenderTarget(),ma=this._renderer.getActiveCubeFace(),ga=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:Ss,format:ln,colorSpace:Rn,depthBuffer:!1},s=Cl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=am(r)),this._blurMaterial=om(r,t,e)}return s}_compileMaterial(t){const e=new jt(this._lodPlanes[0],t);this._renderer.compile(e,fa)}_sceneToCubeUV(t,e,n,s){const o=new Qe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(wl),h.toneMapping=Wn,h.autoClear=!1;const m=new ve({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new jt(new Ps,m);let _=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(wl),_=!0);for(let u=0;u<6;u++){const M=u%3;M===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):M===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const v=this._cubeSize;sr(s,M*v,u>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===$i||t.mapping===ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ll());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new jt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;sr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,fa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Al[(s-1)%Al.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new jt(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*ni-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):ni;p>ni&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ni}`);const u=[];let M=0;for(let A=0;A<ni;++A){const z=A/_,S=Math.exp(-z*z/2);u.push(S),A===0?M+=S:A<p&&(M+=2*S)}for(let A=0;A<u.length;A++)u[A]=u[A]/M;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const x=this._sizeLods[s],L=3*x*(s>v-Hi?s-v+Hi:0),T=4*(this._cubeSize-x);sr(e,L,T,3*x,2*x),l.setRenderTarget(e),l.render(d,fa)}}function am(i){const t=[],e=[],n=[];let s=i;const r=i-Hi+1+Tl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Hi?l=Tl[a-i+Hi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,u=1,M=new Float32Array(_*g*m),v=new Float32Array(p*g*m),x=new Float32Array(u*g*m);for(let T=0;T<m;T++){const A=T%3*2/3-1,z=T>2?0:-1,S=[A,z,0,A+2/3,z,0,A+2/3,z+1,0,A,z,0,A+2/3,z+1,0,A,z+1,0];M.set(S,_*g*T),v.set(f,p*g*T);const w=[T,T,T,T,T,T];x.set(w,u*g*T)}const L=new se;L.setAttribute("position",new Ie(M,_)),L.setAttribute("uv",new Ie(v,p)),L.setAttribute("faceIndex",new Ie(x,u)),t.push(L),s>Hi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Cl(i,t,e){const n=new hi(i,t,e);return n.texture.mapping=Lr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function om(i,t,e){const n=new Float32Array(ni),s=new R(0,1,0);return new je({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ll(){return new je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Pl(){return new je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ao(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function lm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===za||l===Ba,h=l===$i||l===ji;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=t.get(o);return e===null&&(e=new Rl(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),t.set(o,d),d.texture}else{if(t.has(o))return t.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){e===null&&(e=new Rl(i));const f=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function cm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function hm(i,t,e,n){const s={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)t.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(d){const f=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const M=m.array;_=m.version;for(let v=0,x=M.length;v<x;v+=3){const L=M[v+0],T=M[v+1],A=M[v+2];f.push(L,T,T,A,A,L)}}else if(g!==void 0){const M=g.array;_=g.version;for(let v=0,x=M.length/3-1;v<x;v+=3){const L=v+0,T=v+1,A=v+2;f.push(L,T,T,A,A,L)}}else return;const p=new(Fc(f)?Hc:Gc)(f,1);p.version=_;const u=r.get(d);u&&t.remove(u),r.set(d,p)}function h(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function um(i,t,e,n){const s=n.isWebGL2;let r;function a(m){r=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(r,g,o,m*l),e.update(g,r,1)}function d(m,g,_){if(_===0)return;let p,u;if(s)p=i,u="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](r,g,o,m*l,_),e.update(g,r,_)}function f(m,g,_){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<_;u++)this.render(m[u]/l,g[u]);else{p.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let u=0;for(let M=0;M<_;M++)u+=g[M];e.update(u,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function dm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function fm(i,t){return i[0]-t[0]}function pm(i,t){return Math.abs(t[1])-Math.abs(i[1])}function mm(i,t,e){const n={},s=new Float32Array(8),r=new WeakMap,a=new Te,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){const f=c.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let F=function(){j.dispose(),r.delete(h),h.removeEventListener("dispose",F)};var m=F;p!==void 0&&p.texture.dispose();const v=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],z=h.morphAttributes.color||[];let S=0;v===!0&&(S=1),x===!0&&(S=2),L===!0&&(S=3);let w=h.attributes.position.count*S,W=1;w>t.maxTextureSize&&(W=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const I=new Float32Array(w*W*4*_),j=new Bc(I,w,W,_);j.type=kn,j.needsUpdate=!0;const P=S*4;for(let D=0;D<_;D++){const q=T[D],N=A[D],$=z[D],K=w*W*4*D;for(let J=0;J<q.count;J++){const rt=J*P;v===!0&&(a.fromBufferAttribute(q,J),I[K+rt+0]=a.x,I[K+rt+1]=a.y,I[K+rt+2]=a.z,I[K+rt+3]=0),x===!0&&(a.fromBufferAttribute(N,J),I[K+rt+4]=a.x,I[K+rt+5]=a.y,I[K+rt+6]=a.z,I[K+rt+7]=0),L===!0&&(a.fromBufferAttribute($,J),I[K+rt+8]=a.x,I[K+rt+9]=a.y,I[K+rt+10]=a.z,I[K+rt+11]=$.itemSize===4?a.w:1)}}p={count:_,texture:j,size:new Et(w,W)},r.set(h,p),h.addEventListener("dispose",F)}let u=0;for(let v=0;v<f.length;v++)u+=f[v];const M=h.morphTargetsRelative?1:1-u;d.getUniforms().setValue(i,"morphTargetBaseInfluence",M),d.getUniforms().setValue(i,"morphTargetInfluences",f),d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let x=0;x<g;x++)_[x]=[x,0];n[h.id]=_}for(let x=0;x<g;x++){const L=_[x];L[0]=x,L[1]=f[x]}_.sort(pm);for(let x=0;x<8;x++)x<g&&_[x][1]?(o[x][0]=_[x][0],o[x][1]=_[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(fm);const p=h.morphAttributes.position,u=h.morphAttributes.normal;let M=0;for(let x=0;x<8;x++){const L=o[x],T=L[0],A=L[1];T!==Number.MAX_SAFE_INTEGER&&A?(p&&h.getAttribute("morphTarget"+x)!==p[T]&&h.setAttribute("morphTarget"+x,p[T]),u&&h.getAttribute("morphNormal"+x)!==u[T]&&h.setAttribute("morphNormal"+x,u[T]),s[x]=A,M+=A):(p&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),u&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}const v=h.morphTargetsRelative?1:1-M;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function gm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class $c extends Be{constructor(t,e,n,s,r,a,o,l,c,h){if(h=h!==void 0?h:ri,h!==ri&&h!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ri&&(n=Bn),n===void 0&&h===Zi&&(n=si),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Oe,this.minFilter=l!==void 0?l:Oe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const jc=new Be,Kc=new $c(1,1);Kc.compareFunction=Nc;const Zc=new Bc,Jc=new Qu,Qc=new Xc,Dl=[],Ul=[],Il=new Float32Array(16),Nl=new Float32Array(9),Fl=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Dl[s];if(r===void 0&&(r=new Float32Array(s),Dl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ir(i,t){let e=Ul[t];e===void 0&&(e=new Int32Array(t),Ul[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function _m(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function Mm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function ym(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Fl.set(n),i.uniformMatrix2fv(this.addr,!1,Fl),Se(e,n)}}function Sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Nl.set(n),i.uniformMatrix3fv(this.addr,!1,Nl),Se(e,n)}}function bm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Il.set(n),i.uniformMatrix4fv(this.addr,!1,Il),Se(e,n)}}function Em(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function Rm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function Dm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Kc:jc;e.setTexture2D(t||r,s)}function Um(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Jc,s)}function Im(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Qc,s)}function Nm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zc,s)}function Fm(i){switch(i){case 5126:return _m;case 35664:return vm;case 35665:return xm;case 35666:return Mm;case 35674:return ym;case 35675:return Sm;case 35676:return bm;case 5124:case 35670:return Em;case 35667:case 35671:return Tm;case 35668:case 35672:return wm;case 35669:case 35673:return Am;case 5125:return Rm;case 36294:return Cm;case 36295:return Lm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Im;case 36289:case 36303:case 36311:case 36292:return Nm}}function Om(i,t){i.uniform1fv(this.addr,t)}function zm(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function Bm(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function km(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function Gm(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Hm(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Vm(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Wm(i,t){i.uniform1iv(this.addr,t)}function Xm(i,t){i.uniform2iv(this.addr,t)}function qm(i,t){i.uniform3iv(this.addr,t)}function Ym(i,t){i.uniform4iv(this.addr,t)}function $m(i,t){i.uniform1uiv(this.addr,t)}function jm(i,t){i.uniform2uiv(this.addr,t)}function Km(i,t){i.uniform3uiv(this.addr,t)}function Zm(i,t){i.uniform4uiv(this.addr,t)}function Jm(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||jc,r[a])}function Qm(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Jc,r[a])}function tg(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Qc,r[a])}function eg(i,t,e){const n=this.cache,s=t.length,r=Ir(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zc,r[a])}function ng(i){switch(i){case 5126:return Om;case 35664:return zm;case 35665:return Bm;case 35666:return km;case 35674:return Gm;case 35675:return Hm;case 35676:return Vm;case 5124:case 35670:return Wm;case 35667:case 35671:return Xm;case 35668:case 35672:return qm;case 35669:case 35673:return Ym;case 5125:return $m;case 36294:return jm;case 36295:return Km;case 36296:return Zm;case 35678:case 36198:case 36298:case 36306:case 35682:return Jm;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return eg}}class ig{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Fm(e.type)}}class sg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ng(e.type)}}class rg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Ol(i,t){i.seq.push(t),i.map[t.id]=t}function ag(i,t,e){const n=i.name,s=n.length;for(_a.lastIndex=0;;){const r=_a.exec(n),a=_a.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ol(e,c===void 0?new ig(o,i,t):new sg(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new rg(o),Ol(e,d)),e=d}}}class gr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);ag(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function zl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const og=37297;let lg=0;function cg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function hg(i){const t=ae.getPrimaries(ae.workingColorSpace),e=ae.getPrimaries(i);let n;switch(t===e?n="":t===Er&&e===br?n="LinearDisplayP3ToLinearSRGB":t===br&&e===Er&&(n="LinearSRGBToLinearDisplayP3"),i){case Rn:case Pr:return[n,"LinearTransferOETF"];case ue:case no:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Bl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+cg(i.getShaderSource(t),a)}else return s}function ug(i,t){const e=hg(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function dg(i,t){let e;switch(t){case cu:e="Linear";break;case hu:e="Reinhard";break;case uu:e="OptimizedCineon";break;case du:e="ACESFilmic";break;case pu:e="AgX";break;case fu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function fg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Vi).join(`
`)}function pg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Vi).join(`
`)}function mg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function gg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Vi(i){return i!==""}function kl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _g=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(i){return i.replace(_g,xg)}const vg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function xg(i,t){let e=Wt[t];if(e===void 0){const n=vg.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Wa(e)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(i){return i.replace(Mg,yg)}function yg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vl(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Sg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Tc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Oh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(t="SHADOWMAP_TYPE_VSM"),t}function bg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case $i:case ji:t="ENVMAP_TYPE_CUBE";break;case Lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Eg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ji:t="ENVMAP_MODE_REFRACTION";break}return t}function Tg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qa:t="ENVMAP_BLENDING_MULTIPLY";break;case ou:t="ENVMAP_BLENDING_MIX";break;case lu:t="ENVMAP_BLENDING_ADD";break}return t}function wg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ag(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Sg(e),c=bg(e),h=Eg(e),d=Tg(e),f=wg(e),m=e.isWebGL2?"":fg(e),g=pg(e),_=mg(r),p=s.createProgram();let u,M,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Vi).join(`
`),u.length>0&&(u+=`
`),M=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Vi).join(`
`),M.length>0&&(M+=`
`)):(u=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vi).join(`
`),M=[m,Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Wn?"#define TONE_MAPPING":"",e.toneMapping!==Wn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Wn?dg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,ug("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vi).join(`
`)),a=Wa(a),a=kl(a,e),a=Gl(a,e),o=Wa(o),o=kl(o,e),o=Gl(o,e),a=Hl(a),o=Hl(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const x=v+u+a,L=v+M+o,T=zl(s,s.VERTEX_SHADER,x),A=zl(s,s.FRAGMENT_SHADER,L);s.attachShader(p,T),s.attachShader(p,A),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function z(I){if(i.debug.checkShaderErrors){const j=s.getProgramInfoLog(p).trim(),P=s.getShaderInfoLog(T).trim(),F=s.getShaderInfoLog(A).trim();let D=!0,q=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(D=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,T,A);else{const N=Bl(s,T,"vertex"),$=Bl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+j+`
`+N+`
`+$)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(P===""||F==="")&&(q=!1);q&&(I.diagnostics={runnable:D,programLog:j,vertexShader:{log:P,prefix:u},fragmentShader:{log:F,prefix:M}})}s.deleteShader(T),s.deleteShader(A),S=new gr(s,p),w=gg(s,p)}let S;this.getUniforms=function(){return S===void 0&&z(this),S};let w;this.getAttributes=function(){return w===void 0&&z(this),w};let W=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=s.getProgramParameter(p,og)),W},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lg++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=A,this}let Rg=0;class Cg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Lg(t),e.set(t,n)),n}}class Lg{constructor(t){this.id=Rg++,this.code=t,this.usedTimes=0}}function Pg(i,t,e,n,s,r,a){const o=new so,l=new Cg,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function p(S,w,W,I,j){const P=I.fog,F=j.geometry,D=S.isMeshStandardMaterial?I.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||D),N=q&&q.mapping===Lr?q.image.height:null,$=g[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const K=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,J=K!==void 0?K.length:0;let rt=0;F.morphAttributes.position!==void 0&&(rt=1),F.morphAttributes.normal!==void 0&&(rt=2),F.morphAttributes.color!==void 0&&(rt=3);let Y,Z,ht,vt;if($){const pe=un[$];Y=pe.vertexShader,Z=pe.fragmentShader}else Y=S.vertexShader,Z=S.fragmentShader,l.update(S),ht=l.getVertexShaderID(S),vt=l.getFragmentShaderID(S);const dt=i.getRenderTarget(),It=j.isInstancedMesh===!0,Bt=j.isBatchedMesh===!0,Ct=!!S.map,Kt=!!S.matcap,G=!!q,we=!!S.aoMap,wt=!!S.lightMap,Nt=!!S.bumpMap,_t=!!S.normalMap,oe=!!S.displacementMap,Gt=!!S.emissiveMap,E=!!S.metalnessMap,y=!!S.roughnessMap,k=S.anisotropy>0,nt=S.clearcoat>0,tt=S.iridescence>0,it=S.sheen>0,xt=S.transmission>0,ut=k&&!!S.anisotropyMap,gt=nt&&!!S.clearcoatMap,Rt=nt&&!!S.clearcoatNormalMap,Ht=nt&&!!S.clearcoatRoughnessMap,Q=tt&&!!S.iridescenceMap,ee=tt&&!!S.iridescenceThicknessMap,Xt=it&&!!S.sheenColorMap,Ft=it&&!!S.sheenRoughnessMap,bt=!!S.specularMap,ft=!!S.specularColorMap,C=!!S.specularIntensityMap,at=xt&&!!S.transmissionMap,yt=xt&&!!S.thicknessMap,mt=!!S.gradientMap,et=!!S.alphaMap,U=S.alphaTest>0,ot=!!S.alphaHash,ct=!!S.extensions,Lt=!!F.attributes.uv1,At=!!F.attributes.uv2,Zt=!!F.attributes.uv3;let Jt=Wn;return S.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(Jt=i.toneMapping),{isWebGL2:h,shaderID:$,shaderType:S.type,shaderName:S.name,vertexShader:Y,fragmentShader:Z,defines:S.defines,customVertexShaderID:ht,customFragmentShaderID:vt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Bt,instancing:It,instancingColor:It&&j.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:dt===null?i.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Rn,map:Ct,matcap:Kt,envMap:G,envMapMode:G&&q.mapping,envMapCubeUVHeight:N,aoMap:we,lightMap:wt,bumpMap:Nt,normalMap:_t,displacementMap:f&&oe,emissiveMap:Gt,normalMapObjectSpace:_t&&S.normalMapType===wu,normalMapTangentSpace:_t&&S.normalMapType===eo,metalnessMap:E,roughnessMap:y,anisotropy:k,anisotropyMap:ut,clearcoat:nt,clearcoatMap:gt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Ht,iridescence:tt,iridescenceMap:Q,iridescenceThicknessMap:ee,sheen:it,sheenColorMap:Xt,sheenRoughnessMap:Ft,specularMap:bt,specularColorMap:ft,specularIntensityMap:C,transmission:xt,transmissionMap:at,thicknessMap:yt,gradientMap:mt,opaque:S.transparent===!1&&S.blending===Xi,alphaMap:et,alphaTest:U,alphaHash:ot,combine:S.combine,mapUv:Ct&&_(S.map.channel),aoMapUv:we&&_(S.aoMap.channel),lightMapUv:wt&&_(S.lightMap.channel),bumpMapUv:Nt&&_(S.bumpMap.channel),normalMapUv:_t&&_(S.normalMap.channel),displacementMapUv:oe&&_(S.displacementMap.channel),emissiveMapUv:Gt&&_(S.emissiveMap.channel),metalnessMapUv:E&&_(S.metalnessMap.channel),roughnessMapUv:y&&_(S.roughnessMap.channel),anisotropyMapUv:ut&&_(S.anisotropyMap.channel),clearcoatMapUv:gt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&_(S.sheenRoughnessMap.channel),specularMapUv:bt&&_(S.specularMap.channel),specularColorMapUv:ft&&_(S.specularColorMap.channel),specularIntensityMapUv:C&&_(S.specularIntensityMap.channel),transmissionMapUv:at&&_(S.transmissionMap.channel),thicknessMapUv:yt&&_(S.thicknessMap.channel),alphaMapUv:et&&_(S.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(_t||k),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:At,vertexUv3s:Zt,pointsUvs:j.isPoints===!0&&!!F.attributes.uv&&(Ct||et),fog:!!P,useFog:S.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:j.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:rt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&W.length>0,shadowMapType:i.shadowMap.type,toneMapping:Jt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ct&&S.map.isVideoTexture===!0&&ae.getTransfer(S.map.colorSpace)===le,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ze,flipSided:S.side===Ae,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ct&&S.extensions.derivatives===!0,extensionFragDepth:ct&&S.extensions.fragDepth===!0,extensionDrawBuffers:ct&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ct&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ct&&S.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function u(S){const w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(const W in S.defines)w.push(W),w.push(S.defines[W]);return S.isRawShaderMaterial===!1&&(M(w,S),v(w,S),w.push(i.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function M(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function v(S,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),S.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function x(S){const w=g[S.type];let W;if(w){const I=un[w];W=dd.clone(I.uniforms)}else W=S.uniforms;return W}function L(S,w){let W;for(let I=0,j=c.length;I<j;I++){const P=c[I];if(P.cacheKey===w){W=P,++W.usedTimes;break}}return W===void 0&&(W=new Ag(i,w,S,r),c.push(W)),W}function T(S){if(--S.usedTimes===0){const w=c.indexOf(S);c[w]=c[c.length-1],c.pop(),S.destroy()}}function A(S){l.remove(S)}function z(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:x,acquireProgram:L,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:z}}function Dg(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Ug(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,m,g,_,p){let u=i[t];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[t]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=_,u.group=p),t++,u}function o(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):e.push(u)}function l(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):e.unshift(u)}function c(d,f){e.length>1&&e.sort(d||Ug),n.length>1&&n.sort(f||Wl),s.length>1&&s.sort(f||Wl)}function h(){for(let d=t,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Ig(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Xl,i.set(n,[a])):s>=r.length?(a=new Xl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Ng(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new zt};break;case"SpotLight":e={position:new R,direction:new R,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Fg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Og=0;function zg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Bg(i,t){const e=new Ng,n=Fg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new R);const r=new R,a=new ce,o=new ce;function l(h,d){let f=0,m=0,g=0;for(let I=0;I<9;I++)s.probe[I].set(0,0,0);let _=0,p=0,u=0,M=0,v=0,x=0,L=0,T=0,A=0,z=0,S=0;h.sort(zg);const w=d===!0?Math.PI:1;for(let I=0,j=h.length;I<j;I++){const P=h[I],F=P.color,D=P.intensity,q=P.distance,N=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=F.r*D*w,m+=F.g*D*w,g+=F.b*D*w;else if(P.isLightProbe){for(let $=0;$<9;$++)s.probe[$].addScaledVector(P.sh.coefficients[$],D);S++}else if(P.isDirectionalLight){const $=e.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity*w),P.castShadow){const K=P.shadow,J=n.get(P);J.shadowBias=K.bias,J.shadowNormalBias=K.normalBias,J.shadowRadius=K.radius,J.shadowMapSize=K.mapSize,s.directionalShadow[_]=J,s.directionalShadowMap[_]=N,s.directionalShadowMatrix[_]=P.shadow.matrix,x++}s.directional[_]=$,_++}else if(P.isSpotLight){const $=e.get(P);$.position.setFromMatrixPosition(P.matrixWorld),$.color.copy(F).multiplyScalar(D*w),$.distance=q,$.coneCos=Math.cos(P.angle),$.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),$.decay=P.decay,s.spot[u]=$;const K=P.shadow;if(P.map&&(s.spotLightMap[A]=P.map,A++,K.updateMatrices(P),P.castShadow&&z++),s.spotLightMatrix[u]=K.matrix,P.castShadow){const J=n.get(P);J.shadowBias=K.bias,J.shadowNormalBias=K.normalBias,J.shadowRadius=K.radius,J.shadowMapSize=K.mapSize,s.spotShadow[u]=J,s.spotShadowMap[u]=N,T++}u++}else if(P.isRectAreaLight){const $=e.get(P);$.color.copy(F).multiplyScalar(D),$.halfWidth.set(P.width*.5,0,0),$.halfHeight.set(0,P.height*.5,0),s.rectArea[M]=$,M++}else if(P.isPointLight){const $=e.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity*w),$.distance=P.distance,$.decay=P.decay,P.castShadow){const K=P.shadow,J=n.get(P);J.shadowBias=K.bias,J.shadowNormalBias=K.normalBias,J.shadowRadius=K.radius,J.shadowMapSize=K.mapSize,J.shadowCameraNear=K.camera.near,J.shadowCameraFar=K.camera.far,s.pointShadow[p]=J,s.pointShadowMap[p]=N,s.pointShadowMatrix[p]=P.shadow.matrix,L++}s.point[p]=$,p++}else if(P.isHemisphereLight){const $=e.get(P);$.skyColor.copy(P.color).multiplyScalar(D*w),$.groundColor.copy(P.groundColor).multiplyScalar(D*w),s.hemi[v]=$,v++}}M>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=lt.LTC_FLOAT_1,s.rectAreaLTC2=lt.LTC_FLOAT_2):(s.rectAreaLTC1=lt.LTC_HALF_1,s.rectAreaLTC2=lt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=lt.LTC_FLOAT_1,s.rectAreaLTC2=lt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=lt.LTC_HALF_1,s.rectAreaLTC2=lt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const W=s.hash;(W.directionalLength!==_||W.pointLength!==p||W.spotLength!==u||W.rectAreaLength!==M||W.hemiLength!==v||W.numDirectionalShadows!==x||W.numPointShadows!==L||W.numSpotShadows!==T||W.numSpotMaps!==A||W.numLightProbes!==S)&&(s.directional.length=_,s.spot.length=u,s.rectArea.length=M,s.point.length=p,s.hemi.length=v,s.directionalShadow.length=x,s.directionalShadowMap.length=x,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=x,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=T+A-z,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=z,s.numLightProbes=S,W.directionalLength=_,W.pointLength=p,W.spotLength=u,W.rectAreaLength=M,W.hemiLength=v,W.numDirectionalShadows=x,W.numPointShadows=L,W.numSpotShadows=T,W.numSpotMaps=A,W.numLightProbes=S,s.version=Og++)}function c(h,d){let f=0,m=0,g=0,_=0,p=0;const u=d.matrixWorldInverse;for(let M=0,v=h.length;M<v;M++){const x=h[M];if(x.isDirectionalLight){const L=s.directional[f];L.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(u),f++}else if(x.isSpotLight){const L=s.spot[g];L.position.setFromMatrixPosition(x.matrixWorld),L.position.applyMatrix4(u),L.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(u),g++}else if(x.isRectAreaLight){const L=s.rectArea[_];L.position.setFromMatrixPosition(x.matrixWorld),L.position.applyMatrix4(u),o.identity(),a.copy(x.matrixWorld),a.premultiply(u),o.extractRotation(a),L.halfWidth.set(x.width*.5,0,0),L.halfHeight.set(0,x.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const L=s.point[m];L.position.setFromMatrixPosition(x.matrixWorld),L.position.applyMatrix4(u),m++}else if(x.isHemisphereLight){const L=s.hemi[p];L.direction.setFromMatrixPosition(x.matrixWorld),L.direction.transformDirection(u),p++}}}return{setup:l,setupView:c,state:s}}function ql(i,t){const e=new Bg(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function a(d){n.push(d)}function o(d){s.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function kg(i,t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new ql(i,t),e.set(r,[l])):a>=o.length?(l=new ql(i,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:n,dispose:s}}class Gg extends Ln{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hg extends Ln{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Vg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Xg(i,t,e){let n=new ro;const s=new Et,r=new Et,a=new Te,o=new Gg({depthPacking:Tu}),l=new Hg,c={},h=e.maxTextureSize,d={[qn]:Ae,[Ae]:qn,[ze]:ze},f=new je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Vg,fragmentShader:Wg}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new se;g.setAttribute("position",new Ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new jt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tc;let u=this.type;this.render=function(T,A,z){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),w=i.getActiveCubeFace(),W=i.getActiveMipmapLevel(),I=i.state;I.setBlending(Vn),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const j=u!==En&&this.type===En,P=u===En&&this.type!==En;for(let F=0,D=T.length;F<D;F++){const q=T[F],N=q.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const $=N.getFrameExtents();if(s.multiply($),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,N.mapSize.y=r.y)),N.map===null||j===!0||P===!0){const J=this.type!==En?{minFilter:Oe,magFilter:Oe}:{};N.map!==null&&N.map.dispose(),N.map=new hi(s.x,s.y,J),N.map.texture.name=q.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const K=N.getViewportCount();for(let J=0;J<K;J++){const rt=N.getViewport(J);a.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),I.viewport(a),N.updateMatrices(q,J),n=N.getFrustum(),x(A,z,N.camera,q,this.type)}N.isPointLightShadow!==!0&&this.type===En&&M(N,z),N.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(S,w,W)};function M(T,A){const z=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new hi(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,z,f,_,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,z,m,_,null)}function v(T,A,z,S){let w=null;const W=z.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(W!==void 0)w=W;else if(w=z.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const I=w.uuid,j=A.uuid;let P=c[I];P===void 0&&(P={},c[I]=P);let F=P[j];F===void 0&&(F=w.clone(),P[j]=F,A.addEventListener("dispose",L)),w=F}if(w.visible=A.visible,w.wireframe=A.wireframe,S===En?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:d[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,z.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const I=i.properties.get(w);I.light=z}return w}function x(T,A,z,S,w){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===En)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld);const j=t.update(T),P=T.material;if(Array.isArray(P)){const F=j.groups;for(let D=0,q=F.length;D<q;D++){const N=F[D],$=P[N.materialIndex];if($&&$.visible){const K=v(T,$,S,w);T.onBeforeShadow(i,T,A,z,j,K,N),i.renderBufferDirect(z,null,j,K,T,N),T.onAfterShadow(i,T,A,z,j,K,N)}}}else if(P.visible){const F=v(T,P,S,w);T.onBeforeShadow(i,T,A,z,j,F,null),i.renderBufferDirect(z,null,j,F,T,null),T.onAfterShadow(i,T,A,z,j,F,null)}}const I=T.children;for(let j=0,P=I.length;j<P;j++)x(I[j],A,z,S,w)}function L(T){T.target.removeEventListener("dispose",L);for(const z in c){const S=c[z],w=T.target.uuid;w in S&&(S[w].dispose(),delete S[w])}}}function qg(i,t,e){const n=e.isWebGL2;function s(){let U=!1;const ot=new Te;let ct=null;const Lt=new Te(0,0,0,0);return{setMask:function(At){ct!==At&&!U&&(i.colorMask(At,At,At,At),ct=At)},setLocked:function(At){U=At},setClear:function(At,Zt,Jt,de,pe){pe===!0&&(At*=de,Zt*=de,Jt*=de),ot.set(At,Zt,Jt,de),Lt.equals(ot)===!1&&(i.clearColor(At,Zt,Jt,de),Lt.copy(ot))},reset:function(){U=!1,ct=null,Lt.set(-1,0,0,0)}}}function r(){let U=!1,ot=null,ct=null,Lt=null;return{setTest:function(At){At?Bt(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(At){ot!==At&&!U&&(i.depthMask(At),ot=At)},setFunc:function(At){if(ct!==At){switch(At){case tu:i.depthFunc(i.NEVER);break;case eu:i.depthFunc(i.ALWAYS);break;case nu:i.depthFunc(i.LESS);break;case yr:i.depthFunc(i.LEQUAL);break;case iu:i.depthFunc(i.EQUAL);break;case su:i.depthFunc(i.GEQUAL);break;case ru:i.depthFunc(i.GREATER);break;case au:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=At}},setLocked:function(At){U=At},setClear:function(At){Lt!==At&&(i.clearDepth(At),Lt=At)},reset:function(){U=!1,ot=null,ct=null,Lt=null}}}function a(){let U=!1,ot=null,ct=null,Lt=null,At=null,Zt=null,Jt=null,de=null,pe=null;return{setTest:function(Qt){U||(Qt?Bt(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Qt){ot!==Qt&&!U&&(i.stencilMask(Qt),ot=Qt)},setFunc:function(Qt,ge,hn){(ct!==Qt||Lt!==ge||At!==hn)&&(i.stencilFunc(Qt,ge,hn),ct=Qt,Lt=ge,At=hn)},setOp:function(Qt,ge,hn){(Zt!==Qt||Jt!==ge||de!==hn)&&(i.stencilOp(Qt,ge,hn),Zt=Qt,Jt=ge,de=hn)},setLocked:function(Qt){U=Qt},setClear:function(Qt){pe!==Qt&&(i.clearStencil(Qt),pe=Qt)},reset:function(){U=!1,ot=null,ct=null,Lt=null,At=null,Zt=null,Jt=null,de=null,pe=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,u=!1,M=null,v=null,x=null,L=null,T=null,A=null,z=null,S=new zt(0,0,0),w=0,W=!1,I=null,j=null,P=null,F=null,D=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,$=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(K)[1]),N=$>=1):K.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),N=$>=2);let J=null,rt={};const Y=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),ht=new Te().fromArray(Y),vt=new Te().fromArray(Z);function dt(U,ot,ct,Lt){const At=new Uint8Array(4),Zt=i.createTexture();i.bindTexture(U,Zt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Jt=0;Jt<ct;Jt++)n&&(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)?i.texImage3D(ot,0,i.RGBA,1,1,Lt,0,i.RGBA,i.UNSIGNED_BYTE,At):i.texImage2D(ot+Jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,At);return Zt}const It={};It[i.TEXTURE_2D]=dt(i.TEXTURE_2D,i.TEXTURE_2D,1),It[i.TEXTURE_CUBE_MAP]=dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(It[i.TEXTURE_2D_ARRAY]=dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),It[i.TEXTURE_3D]=dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Bt(i.DEPTH_TEST),l.setFunc(yr),Gt(!1),E(Co),Bt(i.CULL_FACE),_t(Vn);function Bt(U){f[U]!==!0&&(i.enable(U),f[U]=!0)}function Ct(U){f[U]!==!1&&(i.disable(U),f[U]=!1)}function Kt(U,ot){return m[U]!==ot?(i.bindFramebuffer(U,ot),m[U]=ot,n&&(U===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=ot),U===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=ot)),!0):!1}function G(U,ot){let ct=_,Lt=!1;if(U)if(ct=g.get(ot),ct===void 0&&(ct=[],g.set(ot,ct)),U.isWebGLMultipleRenderTargets){const At=U.texture;if(ct.length!==At.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let Zt=0,Jt=At.length;Zt<Jt;Zt++)ct[Zt]=i.COLOR_ATTACHMENT0+Zt;ct.length=At.length,Lt=!0}}else ct[0]!==i.COLOR_ATTACHMENT0&&(ct[0]=i.COLOR_ATTACHMENT0,Lt=!0);else ct[0]!==i.BACK&&(ct[0]=i.BACK,Lt=!0);Lt&&(e.isWebGL2?i.drawBuffers(ct):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(ct))}function we(U){return p!==U?(i.useProgram(U),p=U,!0):!1}const wt={[ei]:i.FUNC_ADD,[Bh]:i.FUNC_SUBTRACT,[kh]:i.FUNC_REVERSE_SUBTRACT};if(n)wt[Do]=i.MIN,wt[Uo]=i.MAX;else{const U=t.get("EXT_blend_minmax");U!==null&&(wt[Do]=U.MIN_EXT,wt[Uo]=U.MAX_EXT)}const Nt={[Gh]:i.ZERO,[Hh]:i.ONE,[Vh]:i.SRC_COLOR,[Fa]:i.SRC_ALPHA,[jh]:i.SRC_ALPHA_SATURATE,[Yh]:i.DST_COLOR,[Xh]:i.DST_ALPHA,[Wh]:i.ONE_MINUS_SRC_COLOR,[Oa]:i.ONE_MINUS_SRC_ALPHA,[$h]:i.ONE_MINUS_DST_COLOR,[qh]:i.ONE_MINUS_DST_ALPHA,[Kh]:i.CONSTANT_COLOR,[Zh]:i.ONE_MINUS_CONSTANT_COLOR,[Jh]:i.CONSTANT_ALPHA,[Qh]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(U,ot,ct,Lt,At,Zt,Jt,de,pe,Qt){if(U===Vn){u===!0&&(Ct(i.BLEND),u=!1);return}if(u===!1&&(Bt(i.BLEND),u=!0),U!==zh){if(U!==M||Qt!==W){if((v!==ei||T!==ei)&&(i.blendEquation(i.FUNC_ADD),v=ei,T=ei),Qt)switch(U){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yi:i.blendFunc(i.ONE,i.ONE);break;case Lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Po:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Po:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}x=null,L=null,A=null,z=null,S.set(0,0,0),w=0,M=U,W=Qt}return}At=At||ot,Zt=Zt||ct,Jt=Jt||Lt,(ot!==v||At!==T)&&(i.blendEquationSeparate(wt[ot],wt[At]),v=ot,T=At),(ct!==x||Lt!==L||Zt!==A||Jt!==z)&&(i.blendFuncSeparate(Nt[ct],Nt[Lt],Nt[Zt],Nt[Jt]),x=ct,L=Lt,A=Zt,z=Jt),(de.equals(S)===!1||pe!==w)&&(i.blendColor(de.r,de.g,de.b,pe),S.copy(de),w=pe),M=U,W=!1}function oe(U,ot){U.side===ze?Ct(i.CULL_FACE):Bt(i.CULL_FACE);let ct=U.side===Ae;ot&&(ct=!ct),Gt(ct),U.blending===Xi&&U.transparent===!1?_t(Vn):_t(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),o.setMask(U.colorWrite);const Lt=U.stencilWrite;c.setTest(Lt),Lt&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),k(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Bt(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(U){I!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),I=U)}function E(U){U!==Nh?(Bt(i.CULL_FACE),U!==j&&(U===Co?i.cullFace(i.BACK):U===Fh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),j=U}function y(U){U!==P&&(N&&i.lineWidth(U),P=U)}function k(U,ot,ct){U?(Bt(i.POLYGON_OFFSET_FILL),(F!==ot||D!==ct)&&(i.polygonOffset(ot,ct),F=ot,D=ct)):Ct(i.POLYGON_OFFSET_FILL)}function nt(U){U?Bt(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function tt(U){U===void 0&&(U=i.TEXTURE0+q-1),J!==U&&(i.activeTexture(U),J=U)}function it(U,ot,ct){ct===void 0&&(J===null?ct=i.TEXTURE0+q-1:ct=J);let Lt=rt[ct];Lt===void 0&&(Lt={type:void 0,texture:void 0},rt[ct]=Lt),(Lt.type!==U||Lt.texture!==ot)&&(J!==ct&&(i.activeTexture(ct),J=ct),i.bindTexture(U,ot||It[U]),Lt.type=U,Lt.texture=ot)}function xt(){const U=rt[J];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ut(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function gt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Rt(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ht(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function C(U){ht.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ht.copy(U))}function at(U){vt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),vt.copy(U))}function yt(U,ot){let ct=d.get(ot);ct===void 0&&(ct=new WeakMap,d.set(ot,ct));let Lt=ct.get(U);Lt===void 0&&(Lt=i.getUniformBlockIndex(ot,U.name),ct.set(U,Lt))}function mt(U,ot){const Lt=d.get(ot).get(U);h.get(ot)!==Lt&&(i.uniformBlockBinding(ot,Lt,U.__bindingPointIndex),h.set(ot,Lt))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},J=null,rt={},m={},g=new WeakMap,_=[],p=null,u=!1,M=null,v=null,x=null,L=null,T=null,A=null,z=null,S=new zt(0,0,0),w=0,W=!1,I=null,j=null,P=null,F=null,D=null,ht.set(0,0,i.canvas.width,i.canvas.height),vt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Bt,disable:Ct,bindFramebuffer:Kt,drawBuffers:G,useProgram:we,setBlending:_t,setMaterial:oe,setFlipSided:Gt,setCullFace:E,setLineWidth:y,setPolygonOffset:k,setScissorTest:nt,activeTexture:tt,bindTexture:it,unbindTexture:xt,compressedTexImage2D:ut,compressedTexImage3D:gt,texImage2D:bt,texImage3D:ft,updateUBOMapping:yt,uniformBlockBinding:mt,texStorage2D:Xt,texStorage3D:Ft,texSubImage2D:Rt,texSubImage3D:Ht,compressedTexSubImage2D:Q,compressedTexSubImage3D:ee,scissor:C,viewport:at,reset:et}}function Yg(i,t,e,n,s,r,a){const o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return m?new OffscreenCanvas(E,y):Es("canvas")}function _(E,y,k,nt){let tt=1;if((E.width>nt||E.height>nt)&&(tt=nt/Math.max(E.width,E.height)),tt<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const it=y?wr:Math.floor,xt=it(tt*E.width),ut=it(tt*E.height);d===void 0&&(d=g(xt,ut));const gt=k?g(xt,ut):d;return gt.width=xt,gt.height=ut,gt.getContext("2d").drawImage(E,0,0,xt,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+xt+"x"+ut+")."),gt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return Va(E.width)&&Va(E.height)}function u(E){return o?!1:E.wrapS!==on||E.wrapT!==on||E.minFilter!==Oe&&E.minFilter!==De}function M(E,y){return E.generateMipmaps&&y&&E.minFilter!==Oe&&E.minFilter!==De}function v(E){i.generateMipmap(E)}function x(E,y,k,nt,tt=!1){if(o===!1)return y;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let it=y;if(y===i.RED&&(k===i.FLOAT&&(it=i.R32F),k===i.HALF_FLOAT&&(it=i.R16F),k===i.UNSIGNED_BYTE&&(it=i.R8)),y===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(it=i.R8UI),k===i.UNSIGNED_SHORT&&(it=i.R16UI),k===i.UNSIGNED_INT&&(it=i.R32UI),k===i.BYTE&&(it=i.R8I),k===i.SHORT&&(it=i.R16I),k===i.INT&&(it=i.R32I)),y===i.RG&&(k===i.FLOAT&&(it=i.RG32F),k===i.HALF_FLOAT&&(it=i.RG16F),k===i.UNSIGNED_BYTE&&(it=i.RG8)),y===i.RGBA){const xt=tt?Sr:ae.getTransfer(nt);k===i.FLOAT&&(it=i.RGBA32F),k===i.HALF_FLOAT&&(it=i.RGBA16F),k===i.UNSIGNED_BYTE&&(it=xt===le?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function L(E,y,k){return M(E,k)===!0||E.isFramebufferTexture&&E.minFilter!==Oe&&E.minFilter!==De?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function T(E){return E===Oe||E===Io||E===Wr?i.NEAREST:i.LINEAR}function A(E){const y=E.target;y.removeEventListener("dispose",A),S(y),y.isVideoTexture&&h.delete(y)}function z(E){const y=E.target;y.removeEventListener("dispose",z),W(y)}function S(E){const y=n.get(E);if(y.__webglInit===void 0)return;const k=E.source,nt=f.get(k);if(nt){const tt=nt[y.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&w(E),Object.keys(nt).length===0&&f.delete(k)}n.remove(E)}function w(E){const y=n.get(E);i.deleteTexture(y.__webglTexture);const k=E.source,nt=f.get(k);delete nt[y.__cacheKey],a.memory.textures--}function W(E){const y=E.texture,k=n.get(E),nt=n.get(y);if(nt.__webglTexture!==void 0&&(i.deleteTexture(nt.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(k.__webglFramebuffer[tt]))for(let it=0;it<k.__webglFramebuffer[tt].length;it++)i.deleteFramebuffer(k.__webglFramebuffer[tt][it]);else i.deleteFramebuffer(k.__webglFramebuffer[tt]);k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer[tt])}else{if(Array.isArray(k.__webglFramebuffer))for(let tt=0;tt<k.__webglFramebuffer.length;tt++)i.deleteFramebuffer(k.__webglFramebuffer[tt]);else i.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&i.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let tt=0;tt<k.__webglColorRenderbuffer.length;tt++)k.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(k.__webglColorRenderbuffer[tt]);k.__webglDepthRenderbuffer&&i.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let tt=0,it=y.length;tt<it;tt++){const xt=n.get(y[tt]);xt.__webglTexture&&(i.deleteTexture(xt.__webglTexture),a.memory.textures--),n.remove(y[tt])}n.remove(y),n.remove(E)}let I=0;function j(){I=0}function P(){const E=I;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),I+=1,E}function F(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function D(E,y){const k=n.get(E);if(E.isVideoTexture&&oe(E),E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){const nt=E.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ht(k,E,y);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+y)}function q(E,y){const k=n.get(E);if(E.version>0&&k.__version!==E.version){ht(k,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+y)}function N(E,y){const k=n.get(E);if(E.version>0&&k.__version!==E.version){ht(k,E,y);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+y)}function $(E,y){const k=n.get(E);if(E.version>0&&k.__version!==E.version){vt(k,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+y)}const K={[Ki]:i.REPEAT,[on]:i.CLAMP_TO_EDGE,[ka]:i.MIRRORED_REPEAT},J={[Oe]:i.NEAREST,[Io]:i.NEAREST_MIPMAP_NEAREST,[Wr]:i.NEAREST_MIPMAP_LINEAR,[De]:i.LINEAR,[mu]:i.LINEAR_MIPMAP_NEAREST,[ys]:i.LINEAR_MIPMAP_LINEAR},rt={[Au]:i.NEVER,[Uu]:i.ALWAYS,[Ru]:i.LESS,[Nc]:i.LEQUAL,[Cu]:i.EQUAL,[Du]:i.GEQUAL,[Lu]:i.GREATER,[Pu]:i.NOTEQUAL};function Y(E,y,k){if(k?(i.texParameteri(E,i.TEXTURE_WRAP_S,K[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,K[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,K[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,J[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,J[y.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==on||y.wrapT!==on)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,T(y.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==Oe&&y.minFilter!==De&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,rt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const nt=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===Oe||y.minFilter!==Wr&&y.minFilter!==ys||y.type===kn&&t.has("OES_texture_float_linear")===!1||o===!1&&y.type===Ss&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(E,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function Z(E,y){let k=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",A));const nt=y.source;let tt=f.get(nt);tt===void 0&&(tt={},f.set(nt,tt));const it=F(y);if(it!==E.__cacheKey){tt[it]===void 0&&(tt[it]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),tt[it].usedTimes++;const xt=tt[E.__cacheKey];xt!==void 0&&(tt[E.__cacheKey].usedTimes--,xt.usedTimes===0&&w(y)),E.__cacheKey=it,E.__webglTexture=tt[it].texture}return k}function ht(E,y,k){let nt=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(nt=i.TEXTURE_3D);const tt=Z(E,y),it=y.source;e.bindTexture(nt,E.__webglTexture,i.TEXTURE0+k);const xt=n.get(it);if(it.version!==xt.__version||tt===!0){e.activeTexture(i.TEXTURE0+k);const ut=ae.getPrimaries(ae.workingColorSpace),gt=y.colorSpace===tn?null:ae.getPrimaries(y.colorSpace),Rt=y.colorSpace===tn||ut===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const Ht=u(y)&&p(y.image)===!1;let Q=_(y.image,Ht,!1,s.maxTextureSize);Q=Gt(y,Q);const ee=p(Q)||o,Xt=r.convert(y.format,y.colorSpace);let Ft=r.convert(y.type),bt=x(y.internalFormat,Xt,Ft,y.colorSpace,y.isVideoTexture);Y(nt,y,ee);let ft;const C=y.mipmaps,at=o&&y.isVideoTexture!==!0&&bt!==Uc,yt=xt.__version===void 0||tt===!0,mt=L(y,Q,ee);if(y.isDepthTexture)bt=i.DEPTH_COMPONENT,o?y.type===kn?bt=i.DEPTH_COMPONENT32F:y.type===Bn?bt=i.DEPTH_COMPONENT24:y.type===si?bt=i.DEPTH24_STENCIL8:bt=i.DEPTH_COMPONENT16:y.type===kn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===ri&&bt===i.DEPTH_COMPONENT&&y.type!==to&&y.type!==Bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Bn,Ft=r.convert(y.type)),y.format===Zi&&bt===i.DEPTH_COMPONENT&&(bt=i.DEPTH_STENCIL,y.type!==si&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=si,Ft=r.convert(y.type))),yt&&(at?e.texStorage2D(i.TEXTURE_2D,1,bt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,bt,Q.width,Q.height,0,Xt,Ft,null));else if(y.isDataTexture)if(C.length>0&&ee){at&&yt&&e.texStorage2D(i.TEXTURE_2D,mt,bt,C[0].width,C[0].height);for(let et=0,U=C.length;et<U;et++)ft=C[et],at?e.texSubImage2D(i.TEXTURE_2D,et,0,0,ft.width,ft.height,Xt,Ft,ft.data):e.texImage2D(i.TEXTURE_2D,et,bt,ft.width,ft.height,0,Xt,Ft,ft.data);y.generateMipmaps=!1}else at?(yt&&e.texStorage2D(i.TEXTURE_2D,mt,bt,Q.width,Q.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,Xt,Ft,Q.data)):e.texImage2D(i.TEXTURE_2D,0,bt,Q.width,Q.height,0,Xt,Ft,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){at&&yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,bt,C[0].width,C[0].height,Q.depth);for(let et=0,U=C.length;et<U;et++)ft=C[et],y.format!==ln?Xt!==null?at?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ft.width,ft.height,Q.depth,Xt,ft.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,bt,ft.width,ft.height,Q.depth,0,ft.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ft.width,ft.height,Q.depth,Xt,Ft,ft.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,bt,ft.width,ft.height,Q.depth,0,Xt,Ft,ft.data)}else{at&&yt&&e.texStorage2D(i.TEXTURE_2D,mt,bt,C[0].width,C[0].height);for(let et=0,U=C.length;et<U;et++)ft=C[et],y.format!==ln?Xt!==null?at?e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,ft.width,ft.height,Xt,ft.data):e.compressedTexImage2D(i.TEXTURE_2D,et,bt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?e.texSubImage2D(i.TEXTURE_2D,et,0,0,ft.width,ft.height,Xt,Ft,ft.data):e.texImage2D(i.TEXTURE_2D,et,bt,ft.width,ft.height,0,Xt,Ft,ft.data)}else if(y.isDataArrayTexture)at?(yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,bt,Q.width,Q.height,Q.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,Xt,Ft,Q.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,bt,Q.width,Q.height,Q.depth,0,Xt,Ft,Q.data);else if(y.isData3DTexture)at?(yt&&e.texStorage3D(i.TEXTURE_3D,mt,bt,Q.width,Q.height,Q.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,Xt,Ft,Q.data)):e.texImage3D(i.TEXTURE_3D,0,bt,Q.width,Q.height,Q.depth,0,Xt,Ft,Q.data);else if(y.isFramebufferTexture){if(yt)if(at)e.texStorage2D(i.TEXTURE_2D,mt,bt,Q.width,Q.height);else{let et=Q.width,U=Q.height;for(let ot=0;ot<mt;ot++)e.texImage2D(i.TEXTURE_2D,ot,bt,et,U,0,Xt,Ft,null),et>>=1,U>>=1}}else if(C.length>0&&ee){at&&yt&&e.texStorage2D(i.TEXTURE_2D,mt,bt,C[0].width,C[0].height);for(let et=0,U=C.length;et<U;et++)ft=C[et],at?e.texSubImage2D(i.TEXTURE_2D,et,0,0,Xt,Ft,ft):e.texImage2D(i.TEXTURE_2D,et,bt,Xt,Ft,ft);y.generateMipmaps=!1}else at?(yt&&e.texStorage2D(i.TEXTURE_2D,mt,bt,Q.width,Q.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Xt,Ft,Q)):e.texImage2D(i.TEXTURE_2D,0,bt,Xt,Ft,Q);M(y,ee)&&v(nt),xt.__version=it.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function vt(E,y,k){if(y.image.length!==6)return;const nt=Z(E,y),tt=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+k);const it=n.get(tt);if(tt.version!==it.__version||nt===!0){e.activeTexture(i.TEXTURE0+k);const xt=ae.getPrimaries(ae.workingColorSpace),ut=y.colorSpace===tn?null:ae.getPrimaries(y.colorSpace),gt=y.colorSpace===tn||xt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const Rt=y.isCompressedTexture||y.image[0].isCompressedTexture,Ht=y.image[0]&&y.image[0].isDataTexture,Q=[];for(let et=0;et<6;et++)!Rt&&!Ht?Q[et]=_(y.image[et],!1,!0,s.maxCubemapSize):Q[et]=Ht?y.image[et].image:y.image[et],Q[et]=Gt(y,Q[et]);const ee=Q[0],Xt=p(ee)||o,Ft=r.convert(y.format,y.colorSpace),bt=r.convert(y.type),ft=x(y.internalFormat,Ft,bt,y.colorSpace),C=o&&y.isVideoTexture!==!0,at=it.__version===void 0||nt===!0;let yt=L(y,ee,Xt);Y(i.TEXTURE_CUBE_MAP,y,Xt);let mt;if(Rt){C&&at&&e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,ft,ee.width,ee.height);for(let et=0;et<6;et++){mt=Q[et].mipmaps;for(let U=0;U<mt.length;U++){const ot=mt[U];y.format!==ln?Ft!==null?C?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U,0,0,ot.width,ot.height,Ft,ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U,ft,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U,0,0,ot.width,ot.height,Ft,bt,ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U,ft,ot.width,ot.height,0,Ft,bt,ot.data)}}}else{mt=y.mipmaps,C&&at&&(mt.length>0&&yt++,e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,ft,Q[0].width,Q[0].height));for(let et=0;et<6;et++)if(Ht){C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Q[et].width,Q[et].height,Ft,bt,Q[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,ft,Q[et].width,Q[et].height,0,Ft,bt,Q[et].data);for(let U=0;U<mt.length;U++){const ct=mt[U].image[et].image;C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U+1,0,0,ct.width,ct.height,Ft,bt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U+1,ft,ct.width,ct.height,0,Ft,bt,ct.data)}}else{C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Ft,bt,Q[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,ft,Ft,bt,Q[et]);for(let U=0;U<mt.length;U++){const ot=mt[U];C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U+1,0,0,Ft,bt,ot.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,U+1,ft,Ft,bt,ot.image[et])}}}M(y,Xt)&&v(i.TEXTURE_CUBE_MAP),it.__version=tt.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function dt(E,y,k,nt,tt,it){const xt=r.convert(k.format,k.colorSpace),ut=r.convert(k.type),gt=x(k.internalFormat,xt,ut,k.colorSpace);if(!n.get(y).__hasExternalTextures){const Ht=Math.max(1,y.width>>it),Q=Math.max(1,y.height>>it);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,it,gt,Ht,Q,y.depth,0,xt,ut,null):e.texImage2D(tt,it,gt,Ht,Q,0,xt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),_t(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,tt,n.get(k).__webglTexture,0,Nt(y)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,tt,n.get(k).__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(E,y,k){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let nt=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(k||_t(y)){const tt=y.depthTexture;tt&&tt.isDepthTexture&&(tt.type===kn?nt=i.DEPTH_COMPONENT32F:tt.type===Bn&&(nt=i.DEPTH_COMPONENT24));const it=Nt(y);_t(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,nt,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,it,nt,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,nt,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){const nt=Nt(y);k&&_t(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,i.DEPTH24_STENCIL8,y.width,y.height):_t(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const nt=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let tt=0;tt<nt.length;tt++){const it=nt[tt],xt=r.convert(it.format,it.colorSpace),ut=r.convert(it.type),gt=x(it.internalFormat,xt,ut,it.colorSpace),Rt=Nt(y);k&&_t(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,gt,y.width,y.height):_t(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,gt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,gt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Bt(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),D(y.depthTexture,0);const nt=n.get(y.depthTexture).__webglTexture,tt=Nt(y);if(y.depthTexture.format===ri)_t(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(y.depthTexture.format===Zi)_t(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Ct(E){const y=n.get(E),k=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Bt(y.__webglFramebuffer,E)}else if(k){y.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[nt]),y.__webglDepthbuffer[nt]=i.createRenderbuffer(),It(y.__webglDepthbuffer[nt],E,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),It(y.__webglDepthbuffer,E,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Kt(E,y,k){const nt=n.get(E);y!==void 0&&dt(nt.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ct(E)}function G(E){const y=E.texture,k=n.get(E),nt=n.get(y);E.addEventListener("dispose",z),E.isWebGLMultipleRenderTargets!==!0&&(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=y.version,a.memory.textures++);const tt=E.isWebGLCubeRenderTarget===!0,it=E.isWebGLMultipleRenderTargets===!0,xt=p(E)||o;if(tt){k.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(o&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[ut]=[];for(let gt=0;gt<y.mipmaps.length;gt++)k.__webglFramebuffer[ut][gt]=i.createFramebuffer()}else k.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let ut=0;ut<y.mipmaps.length;ut++)k.__webglFramebuffer[ut]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(it)if(s.drawBuffers){const ut=E.texture;for(let gt=0,Rt=ut.length;gt<Rt;gt++){const Ht=n.get(ut[gt]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&_t(E)===!1){const ut=it?y:[y];k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let gt=0;gt<ut.length;gt++){const Rt=ut[gt];k.__webglColorRenderbuffer[gt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[gt]);const Ht=r.convert(Rt.format,Rt.colorSpace),Q=r.convert(Rt.type),ee=x(Rt.internalFormat,Ht,Q,Rt.colorSpace,E.isXRRenderTarget===!0),Xt=Nt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,ee,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,k.__webglColorRenderbuffer[gt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),It(k.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(tt){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),Y(i.TEXTURE_CUBE_MAP,y,xt);for(let ut=0;ut<6;ut++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)dt(k.__webglFramebuffer[ut][gt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,gt);else dt(k.__webglFramebuffer[ut],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);M(y,xt)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(it){const ut=E.texture;for(let gt=0,Rt=ut.length;gt<Rt;gt++){const Ht=ut[gt],Q=n.get(Ht);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),Y(i.TEXTURE_2D,Ht,xt),dt(k.__webglFramebuffer,E,Ht,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,0),M(Ht,xt)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?ut=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ut,nt.__webglTexture),Y(ut,y,xt),o&&y.mipmaps&&y.mipmaps.length>0)for(let gt=0;gt<y.mipmaps.length;gt++)dt(k.__webglFramebuffer[gt],E,y,i.COLOR_ATTACHMENT0,ut,gt);else dt(k.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,ut,0);M(y,xt)&&v(ut),e.unbindTexture()}E.depthBuffer&&Ct(E)}function we(E){const y=p(E)||o,k=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let nt=0,tt=k.length;nt<tt;nt++){const it=k[nt];if(M(it,y)){const xt=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ut=n.get(it).__webglTexture;e.bindTexture(xt,ut),v(xt),e.unbindTexture()}}}function wt(E){if(o&&E.samples>0&&_t(E)===!1){const y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],k=E.width,nt=E.height;let tt=i.COLOR_BUFFER_BIT;const it=[],xt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(E),gt=E.isWebGLMultipleRenderTargets===!0;if(gt)for(let Rt=0;Rt<y.length;Rt++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let Rt=0;Rt<y.length;Rt++){it.push(i.COLOR_ATTACHMENT0+Rt),E.depthBuffer&&it.push(xt);const Ht=ut.__ignoreDepthValues!==void 0?ut.__ignoreDepthValues:!1;if(Ht===!1&&(E.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),gt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[Rt]),Ht===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[xt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[xt])),gt){const Q=n.get(y[Rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,k,nt,0,0,k,nt,tt,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),gt)for(let Rt=0;Rt<y.length;Rt++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.RENDERBUFFER,ut.__webglColorRenderbuffer[Rt]);const Ht=n.get(y[Rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Rt,i.TEXTURE_2D,Ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}}function Nt(E){return Math.min(s.maxSamples,E.samples)}function _t(E){const y=n.get(E);return o&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function oe(E){const y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function Gt(E,y){const k=E.colorSpace,nt=E.format,tt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Ha||k!==Rn&&k!==tn&&(ae.getTransfer(k)===le?o===!1?t.has("EXT_sRGB")===!0&&nt===ln?(E.format=Ha,E.minFilter=De,E.generateMipmaps=!1):y=Oc.sRGBToLinear(y):(nt!==ln||tt!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),y}this.allocateTextureUnit=P,this.resetTextureUnits=j,this.setTexture2D=D,this.setTexture2DArray=q,this.setTexture3D=N,this.setTextureCube=$,this.rebindTextures=Kt,this.setupRenderTarget=G,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=_t}function $g(i,t,e){const n=e.isWebGL2;function s(r,a=tn){let o;const l=ae.getTransfer(a);if(r===Xn)return i.UNSIGNED_BYTE;if(r===Rc)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Cc)return i.UNSIGNED_SHORT_5_5_5_1;if(r===gu)return i.BYTE;if(r===_u)return i.SHORT;if(r===to)return i.UNSIGNED_SHORT;if(r===Ac)return i.INT;if(r===Bn)return i.UNSIGNED_INT;if(r===kn)return i.FLOAT;if(r===Ss)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===vu)return i.ALPHA;if(r===ln)return i.RGBA;if(r===xu)return i.LUMINANCE;if(r===Mu)return i.LUMINANCE_ALPHA;if(r===ri)return i.DEPTH_COMPONENT;if(r===Zi)return i.DEPTH_STENCIL;if(r===Ha)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===yu)return i.RED;if(r===Lc)return i.RED_INTEGER;if(r===Su)return i.RG;if(r===Pc)return i.RG_INTEGER;if(r===Dc)return i.RGBA_INTEGER;if(r===Xr||r===qr||r===Yr||r===$r)if(l===le)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Xr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===qr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Yr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===$r)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Xr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===qr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Yr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===$r)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===No||r===Fo||r===Oo||r===zo)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===No)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Fo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Oo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===zo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Uc)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Bo||r===ko)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Bo)return l===le?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ko)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Go||r===Ho||r===Vo||r===Wo||r===Xo||r===qo||r===Yo||r===$o||r===jo||r===Ko||r===Zo||r===Jo||r===Qo||r===tl)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Go)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Ho)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Vo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Wo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Xo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===qo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Yo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===$o)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===jo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ko)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Zo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Jo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Qo)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===tl)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===jr||r===el||r===nl)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===jr)return l===le?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===el)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===nl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===bu||r===il||r===sl||r===rl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===jr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===il)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===sl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===rl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===si?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class jg extends Qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Dt extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Kg={type:"move"};class va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),u=this._getHandJoint(c,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Kg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Dt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Zg extends di{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,m=null,g=null;const _=e.getContextAttributes();let p=null,u=null;const M=[],v=[],x=new Et;let L=null;const T=new Qe;T.layers.enable(1),T.viewport=new Te;const A=new Qe;A.layers.enable(2),A.viewport=new Te;const z=[T,A],S=new jg;S.layers.enable(1),S.layers.enable(2);let w=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=M[Y];return Z===void 0&&(Z=new va,M[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=M[Y];return Z===void 0&&(Z=new va,M[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=M[Y];return Z===void 0&&(Z=new va,M[Y]=Z),Z.getHandSpace()};function I(Y){const Z=v.indexOf(Y.inputSource);if(Z===-1)return;const ht=M[Z];ht!==void 0&&(ht.update(Y.inputSource,Y.frame,c||a),ht.dispatchEvent({type:Y.type,data:Y.inputSource}))}function j(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",P);for(let Y=0;Y<M.length;Y++){const Z=v[Y];Z!==null&&(v[Y]=null,M[Y].disconnect(Z))}w=null,W=null,t.setRenderTarget(p),m=null,f=null,d=null,s=null,u=null,rt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",j),s.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(x),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const Z={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,Z),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new hi(m.framebufferWidth,m.framebufferHeight,{format:ln,type:Xn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,ht=null,vt=null;_.depth&&(vt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Z=_.stencil?Zi:ri,ht=_.stencil?si:Bn);const dt={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(dt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),u=new hi(f.textureWidth,f.textureHeight,{format:ln,type:Xn,depthTexture:new $c(f.textureWidth,f.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const It=t.properties.get(u);It.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),rt.setContext(s),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(Y){for(let Z=0;Z<Y.removed.length;Z++){const ht=Y.removed[Z],vt=v.indexOf(ht);vt>=0&&(v[vt]=null,M[vt].disconnect(ht))}for(let Z=0;Z<Y.added.length;Z++){const ht=Y.added[Z];let vt=v.indexOf(ht);if(vt===-1){for(let It=0;It<M.length;It++)if(It>=v.length){v.push(ht),vt=It;break}else if(v[It]===null){v[It]=ht,vt=It;break}if(vt===-1)break}const dt=M[vt];dt&&dt.connect(ht)}}const F=new R,D=new R;function q(Y,Z,ht){F.setFromMatrixPosition(Z.matrixWorld),D.setFromMatrixPosition(ht.matrixWorld);const vt=F.distanceTo(D),dt=Z.projectionMatrix.elements,It=ht.projectionMatrix.elements,Bt=dt[14]/(dt[10]-1),Ct=dt[14]/(dt[10]+1),Kt=(dt[9]+1)/dt[5],G=(dt[9]-1)/dt[5],we=(dt[8]-1)/dt[0],wt=(It[8]+1)/It[0],Nt=Bt*we,_t=Bt*wt,oe=vt/(-we+wt),Gt=oe*-we;Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Gt),Y.translateZ(oe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const E=Bt+oe,y=Ct+oe,k=Nt-Gt,nt=_t+(vt-Gt),tt=Kt*Ct/y*E,it=G*Ct/y*E;Y.projectionMatrix.makePerspective(k,nt,tt,it,E,y),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function N(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;S.near=A.near=T.near=Y.near,S.far=A.far=T.far=Y.far,(w!==S.near||W!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),w=S.near,W=S.far);const Z=Y.parent,ht=S.cameras;N(S,Z);for(let vt=0;vt<ht.length;vt++)N(ht[vt],Z);ht.length===2?q(S,T,A):S.projectionMatrix.copy(T.projectionMatrix),$(Y,S,Z)};function $(Y,Z,ht){ht===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(ht.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=bs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)};let K=null;function J(Y,Z){if(h=Z.getViewerPose(c||a),g=Z,h!==null){const ht=h.views;m!==null&&(t.setRenderTargetFramebuffer(u,m.framebuffer),t.setRenderTarget(u));let vt=!1;ht.length!==S.cameras.length&&(S.cameras.length=0,vt=!0);for(let dt=0;dt<ht.length;dt++){const It=ht[dt];let Bt=null;if(m!==null)Bt=m.getViewport(It);else{const Kt=d.getViewSubImage(f,It);Bt=Kt.viewport,dt===0&&(t.setRenderTargetTextures(u,Kt.colorTexture,f.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(u))}let Ct=z[dt];Ct===void 0&&(Ct=new Qe,Ct.layers.enable(dt),Ct.viewport=new Te,z[dt]=Ct),Ct.matrix.fromArray(It.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(It.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),dt===0&&(S.matrix.copy(Ct.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),vt===!0&&S.cameras.push(Ct)}}for(let ht=0;ht<M.length;ht++){const vt=v[ht],dt=M[ht];vt!==null&&dt!==void 0&&dt.update(vt,Z,c||a)}K&&K(Y,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}const rt=new qc;rt.setAnimationLoop(J),this.setAnimationLoop=function(Y){K=Y},this.dispose=function(){}}}function Jg(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,Vc(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,M,v,x){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),d(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,x)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),_(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,M,v):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Ae&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Ae&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const M=t.get(u).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*v,e(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,M,v){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*M,p.scale.value=v*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),t.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,M){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ae&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const M=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Qg(i,t,e,n){let s={},r={},a=[];const o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const x=v.program;n.uniformBlockBinding(M,x)}function c(M,v){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",p));const L=v.program;n.updateUBOMapping(M,L);const T=t.render.frame;r[M.id]!==T&&(f(M),r[M.id]=T)}function h(M){const v=d();M.__bindingPointIndex=v;const x=i.createBuffer(),L=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,L,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=s[M.id],x=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,A=x.length;T<A;T++){const z=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,w=z.length;S<w;S++){const W=z[S];if(m(W,T,S,L)===!0){const I=W.__offset,j=Array.isArray(W.value)?W.value:[W.value];let P=0;for(let F=0;F<j.length;F++){const D=j[F],q=_(D);typeof D=="number"||typeof D=="boolean"?(W.__data[0]=D,i.bufferSubData(i.UNIFORM_BUFFER,I+P,W.__data)):D.isMatrix3?(W.__data[0]=D.elements[0],W.__data[1]=D.elements[1],W.__data[2]=D.elements[2],W.__data[3]=0,W.__data[4]=D.elements[3],W.__data[5]=D.elements[4],W.__data[6]=D.elements[5],W.__data[7]=0,W.__data[8]=D.elements[6],W.__data[9]=D.elements[7],W.__data[10]=D.elements[8],W.__data[11]=0):(D.toArray(W.__data,P),P+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,I,W.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,v,x,L){const T=M.value,A=v+"_"+x;if(L[A]===void 0)return typeof T=="number"||typeof T=="boolean"?L[A]=T:L[A]=T.clone(),!0;{const z=L[A];if(typeof T=="number"||typeof T=="boolean"){if(z!==T)return L[A]=T,!0}else if(z.equals(T)===!1)return z.copy(T),!0}return!1}function g(M){const v=M.uniforms;let x=0;const L=16;for(let A=0,z=v.length;A<z;A++){const S=Array.isArray(v[A])?v[A]:[v[A]];for(let w=0,W=S.length;w<W;w++){const I=S[w],j=Array.isArray(I.value)?I.value:[I.value];for(let P=0,F=j.length;P<F;P++){const D=j[P],q=_(D),N=x%L;N!==0&&L-N<q.boundary&&(x+=L-N),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=q.storage}}}const T=x%L;return T>0&&(x+=L-T),M.__size=x,M.__cache={},this}function _(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function p(M){const v=M.target;v.removeEventListener("dispose",p);const x=a.indexOf(v.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function u(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}class th{constructor(t={}){const{canvas:e=$u(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const u=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ue,this._useLegacyLights=!1,this.toneMapping=Wn,this.toneMappingExposure=1;const v=this;let x=!1,L=0,T=0,A=null,z=-1,S=null;const w=new Te,W=new Te;let I=null;const j=new zt(0);let P=0,F=e.width,D=e.height,q=1,N=null,$=null;const K=new Te(0,0,F,D),J=new Te(0,0,F,D);let rt=!1;const Y=new ro;let Z=!1,ht=!1,vt=null;const dt=new ce,It=new Et,Bt=new R,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Kt(){return A===null?q:1}let G=n;function we(b,O){for(let V=0;V<b.length;V++){const X=b[V],H=e.getContext(X,O);if(H!==null)return H}return null}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ja}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",ot,!1),G===null){const O=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&O.shift(),G=we(O,b),G===null)throw we(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let wt,Nt,_t,oe,Gt,E,y,k,nt,tt,it,xt,ut,gt,Rt,Ht,Q,ee,Xt,Ft,bt,ft,C,at;function yt(){wt=new cm(G),Nt=new im(G,wt,t),wt.init(Nt),ft=new $g(G,wt,Nt),_t=new qg(G,wt,Nt),oe=new dm(G),Gt=new Dg,E=new Yg(G,wt,_t,Gt,Nt,ft,oe),y=new rm(v),k=new lm(v),nt=new xd(G,Nt),C=new em(G,wt,nt,Nt),tt=new hm(G,nt,oe,C),it=new gm(G,tt,nt,oe),Xt=new mm(G,Nt,E),Ht=new sm(Gt),xt=new Pg(v,y,k,wt,Nt,C,Ht),ut=new Jg(v,Gt),gt=new Ig,Rt=new kg(wt,Nt),ee=new tm(v,y,k,_t,it,f,l),Q=new Xg(v,it,Nt),at=new Qg(G,oe,Nt,_t),Ft=new nm(G,wt,oe,Nt),bt=new um(G,wt,oe,Nt),oe.programs=xt.programs,v.capabilities=Nt,v.extensions=wt,v.properties=Gt,v.renderLists=gt,v.shadowMap=Q,v.state=_t,v.info=oe}yt();const mt=new Zg(v,G);this.xr=mt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const b=wt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=wt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(b){b!==void 0&&(q=b,this.setSize(F,D,!1))},this.getSize=function(b){return b.set(F,D)},this.setSize=function(b,O,V=!0){if(mt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=b,D=O,e.width=Math.floor(b*q),e.height=Math.floor(O*q),V===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(F*q,D*q).floor()},this.setDrawingBufferSize=function(b,O,V){F=b,D=O,q=V,e.width=Math.floor(b*V),e.height=Math.floor(O*V),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(K)},this.setViewport=function(b,O,V,X){b.isVector4?K.set(b.x,b.y,b.z,b.w):K.set(b,O,V,X),_t.viewport(w.copy(K).multiplyScalar(q).floor())},this.getScissor=function(b){return b.copy(J)},this.setScissor=function(b,O,V,X){b.isVector4?J.set(b.x,b.y,b.z,b.w):J.set(b,O,V,X),_t.scissor(W.copy(J).multiplyScalar(q).floor())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){_t.setScissorTest(rt=b)},this.setOpaqueSort=function(b){N=b},this.setTransparentSort=function(b){$=b},this.getClearColor=function(b){return b.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor.apply(ee,arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha.apply(ee,arguments)},this.clear=function(b=!0,O=!0,V=!0){let X=0;if(b){let H=!1;if(A!==null){const pt=A.texture.format;H=pt===Dc||pt===Pc||pt===Lc}if(H){const pt=A.texture.type,St=pt===Xn||pt===Bn||pt===to||pt===si||pt===Rc||pt===Cc,Pt=ee.getClearColor(),Ot=ee.getClearAlpha(),qt=Pt.r,kt=Pt.g,Vt=Pt.b;St?(m[0]=qt,m[1]=kt,m[2]=Vt,m[3]=Ot,G.clearBufferuiv(G.COLOR,0,m)):(g[0]=qt,g[1]=kt,g[2]=Vt,g[3]=Ot,G.clearBufferiv(G.COLOR,0,g))}else X|=G.COLOR_BUFFER_BIT}O&&(X|=G.DEPTH_BUFFER_BIT),V&&(X|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),gt.dispose(),Rt.dispose(),Gt.dispose(),y.dispose(),k.dispose(),it.dispose(),C.dispose(),at.dispose(),xt.dispose(),mt.dispose(),mt.removeEventListener("sessionstart",pe),mt.removeEventListener("sessionend",Qt),vt&&(vt.dispose(),vt=null),ge.stop()};function et(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const b=oe.autoReset,O=Q.enabled,V=Q.autoUpdate,X=Q.needsUpdate,H=Q.type;yt(),oe.autoReset=b,Q.enabled=O,Q.autoUpdate=V,Q.needsUpdate=X,Q.type=H}function ot(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ct(b){const O=b.target;O.removeEventListener("dispose",ct),Lt(O)}function Lt(b){At(b),Gt.remove(b)}function At(b){const O=Gt.get(b).programs;O!==void 0&&(O.forEach(function(V){xt.releaseProgram(V)}),b.isShaderMaterial&&xt.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,V,X,H,pt){O===null&&(O=Ct);const St=H.isMesh&&H.matrixWorld.determinant()<0,Pt=ch(b,O,V,X,H);_t.setMaterial(X,St);let Ot=V.index,qt=1;if(X.wireframe===!0){if(Ot=tt.getWireframeAttribute(V),Ot===void 0)return;qt=2}const kt=V.drawRange,Vt=V.attributes.position;let me=kt.start*qt,Xe=(kt.start+kt.count)*qt;pt!==null&&(me=Math.max(me,pt.start*qt),Xe=Math.min(Xe,(pt.start+pt.count)*qt)),Ot!==null?(me=Math.max(me,0),Xe=Math.min(Xe,Ot.count)):Vt!=null&&(me=Math.max(me,0),Xe=Math.min(Xe,Vt.count));const be=Xe-me;if(be<0||be===1/0)return;C.setup(H,X,Pt,V,Ot);let _n,he=Ft;if(Ot!==null&&(_n=nt.get(Ot),he=bt,he.setIndex(_n)),H.isMesh)X.wireframe===!0?(_t.setLineWidth(X.wireframeLinewidth*Kt()),he.setMode(G.LINES)):he.setMode(G.TRIANGLES);else if(H.isLine){let Yt=X.linewidth;Yt===void 0&&(Yt=1),_t.setLineWidth(Yt*Kt()),H.isLineSegments?he.setMode(G.LINES):H.isLineLoop?he.setMode(G.LINE_LOOP):he.setMode(G.LINE_STRIP)}else H.isPoints?he.setMode(G.POINTS):H.isSprite&&he.setMode(G.TRIANGLES);if(H.isBatchedMesh)he.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)he.renderInstances(me,be,H.count);else if(V.isInstancedBufferGeometry){const Yt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Nr=Math.min(V.instanceCount,Yt);he.renderInstances(me,be,Nr)}else he.render(me,be)};function Zt(b,O,V){b.transparent===!0&&b.side===ze&&b.forceSinglePass===!1?(b.side=Ae,b.needsUpdate=!0,Ns(b,O,V),b.side=qn,b.needsUpdate=!0,Ns(b,O,V),b.side=ze):Ns(b,O,V)}this.compile=function(b,O,V=null){V===null&&(V=b),p=Rt.get(V),p.init(),M.push(p),V.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),b!==V&&b.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights(v._useLegacyLights);const X=new Set;return b.traverse(function(H){const pt=H.material;if(pt)if(Array.isArray(pt))for(let St=0;St<pt.length;St++){const Pt=pt[St];Zt(Pt,V,H),X.add(Pt)}else Zt(pt,V,H),X.add(pt)}),M.pop(),p=null,X},this.compileAsync=function(b,O,V=null){const X=this.compile(b,O,V);return new Promise(H=>{function pt(){if(X.forEach(function(St){Gt.get(St).currentProgram.isReady()&&X.delete(St)}),X.size===0){H(b);return}setTimeout(pt,10)}wt.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Jt=null;function de(b){Jt&&Jt(b)}function pe(){ge.stop()}function Qt(){ge.start()}const ge=new qc;ge.setAnimationLoop(de),typeof self<"u"&&ge.setContext(self),this.setAnimationLoop=function(b){Jt=b,mt.setAnimationLoop(b),b===null?ge.stop():ge.start()},mt.addEventListener("sessionstart",pe),mt.addEventListener("sessionend",Qt),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),mt.enabled===!0&&mt.isPresenting===!0&&(mt.cameraAutoUpdate===!0&&mt.updateCamera(O),O=mt.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,O,A),p=Rt.get(b,M.length),p.init(),M.push(p),dt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Y.setFromProjectionMatrix(dt),ht=this.localClippingEnabled,Z=Ht.init(this.clippingPlanes,ht),_=gt.get(b,u.length),_.init(),u.push(_),hn(b,O,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(N,$),this.info.render.frame++,Z===!0&&Ht.beginShadows();const V=p.state.shadowsArray;if(Q.render(V,b,O),Z===!0&&Ht.endShadows(),this.info.autoReset===!0&&this.info.reset(),ee.render(_,b),p.setupLights(v._useLegacyLights),O.isArrayCamera){const X=O.cameras;for(let H=0,pt=X.length;H<pt;H++){const St=X[H];po(_,b,St,St.viewport)}}else po(_,b,O);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(v,b,O),C.resetDefaultState(),z=-1,S=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function hn(b,O,V,X){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){X&&Bt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(dt);const St=it.update(b),Pt=b.material;Pt.visible&&_.push(b,St,Pt,V,Bt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const St=it.update(b),Pt=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Bt.copy(b.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Bt.copy(St.boundingSphere.center)),Bt.applyMatrix4(b.matrixWorld).applyMatrix4(dt)),Array.isArray(Pt)){const Ot=St.groups;for(let qt=0,kt=Ot.length;qt<kt;qt++){const Vt=Ot[qt],me=Pt[Vt.materialIndex];me&&me.visible&&_.push(b,St,me,V,Bt.z,Vt)}}else Pt.visible&&_.push(b,St,Pt,V,Bt.z,null)}}const pt=b.children;for(let St=0,Pt=pt.length;St<Pt;St++)hn(pt[St],O,V,X)}function po(b,O,V,X){const H=b.opaque,pt=b.transmissive,St=b.transparent;p.setupLightsView(V),Z===!0&&Ht.setGlobalState(v.clippingPlanes,V),pt.length>0&&lh(H,pt,O,V),X&&_t.viewport(w.copy(X)),H.length>0&&Is(H,O,V),pt.length>0&&Is(pt,O,V),St.length>0&&Is(St,O,V),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function lh(b,O,V,X){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const pt=Nt.isWebGL2;vt===null&&(vt=new hi(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")?Ss:Xn,minFilter:ys,samples:pt?4:0})),v.getDrawingBufferSize(It),pt?vt.setSize(It.x,It.y):vt.setSize(wr(It.x),wr(It.y));const St=v.getRenderTarget();v.setRenderTarget(vt),v.getClearColor(j),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const Pt=v.toneMapping;v.toneMapping=Wn,Is(b,V,X),E.updateMultisampleRenderTarget(vt),E.updateRenderTargetMipmap(vt);let Ot=!1;for(let qt=0,kt=O.length;qt<kt;qt++){const Vt=O[qt],me=Vt.object,Xe=Vt.geometry,be=Vt.material,_n=Vt.group;if(be.side===ze&&me.layers.test(X.layers)){const he=be.side;be.side=Ae,be.needsUpdate=!0,mo(me,V,X,Xe,be,_n),be.side=he,be.needsUpdate=!0,Ot=!0}}Ot===!0&&(E.updateMultisampleRenderTarget(vt),E.updateRenderTargetMipmap(vt)),v.setRenderTarget(St),v.setClearColor(j,P),v.toneMapping=Pt}function Is(b,O,V){const X=O.isScene===!0?O.overrideMaterial:null;for(let H=0,pt=b.length;H<pt;H++){const St=b[H],Pt=St.object,Ot=St.geometry,qt=X===null?St.material:X,kt=St.group;Pt.layers.test(V.layers)&&mo(Pt,O,V,Ot,qt,kt)}}function mo(b,O,V,X,H,pt){b.onBeforeRender(v,O,V,X,H,pt),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(v,O,V,X,b,pt),H.transparent===!0&&H.side===ze&&H.forceSinglePass===!1?(H.side=Ae,H.needsUpdate=!0,v.renderBufferDirect(V,O,X,H,b,pt),H.side=qn,H.needsUpdate=!0,v.renderBufferDirect(V,O,X,H,b,pt),H.side=ze):v.renderBufferDirect(V,O,X,H,b,pt),b.onAfterRender(v,O,V,X,H,pt)}function Ns(b,O,V){O.isScene!==!0&&(O=Ct);const X=Gt.get(b),H=p.state.lights,pt=p.state.shadowsArray,St=H.state.version,Pt=xt.getParameters(b,H.state,pt,O,V),Ot=xt.getProgramCacheKey(Pt);let qt=X.programs;X.environment=b.isMeshStandardMaterial?O.environment:null,X.fog=O.fog,X.envMap=(b.isMeshStandardMaterial?k:y).get(b.envMap||X.environment),qt===void 0&&(b.addEventListener("dispose",ct),qt=new Map,X.programs=qt);let kt=qt.get(Ot);if(kt!==void 0){if(X.currentProgram===kt&&X.lightsStateVersion===St)return _o(b,Pt),kt}else Pt.uniforms=xt.getUniforms(b),b.onBuild(V,Pt,v),b.onBeforeCompile(Pt,v),kt=xt.acquireProgram(Pt,Ot),qt.set(Ot,kt),X.uniforms=Pt.uniforms;const Vt=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Vt.clippingPlanes=Ht.uniform),_o(b,Pt),X.needsLights=uh(b),X.lightsStateVersion=St,X.needsLights&&(Vt.ambientLightColor.value=H.state.ambient,Vt.lightProbe.value=H.state.probe,Vt.directionalLights.value=H.state.directional,Vt.directionalLightShadows.value=H.state.directionalShadow,Vt.spotLights.value=H.state.spot,Vt.spotLightShadows.value=H.state.spotShadow,Vt.rectAreaLights.value=H.state.rectArea,Vt.ltc_1.value=H.state.rectAreaLTC1,Vt.ltc_2.value=H.state.rectAreaLTC2,Vt.pointLights.value=H.state.point,Vt.pointLightShadows.value=H.state.pointShadow,Vt.hemisphereLights.value=H.state.hemi,Vt.directionalShadowMap.value=H.state.directionalShadowMap,Vt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Vt.spotShadowMap.value=H.state.spotShadowMap,Vt.spotLightMatrix.value=H.state.spotLightMatrix,Vt.spotLightMap.value=H.state.spotLightMap,Vt.pointShadowMap.value=H.state.pointShadowMap,Vt.pointShadowMatrix.value=H.state.pointShadowMatrix),X.currentProgram=kt,X.uniformsList=null,kt}function go(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=gr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function _o(b,O){const V=Gt.get(b);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function ch(b,O,V,X,H){O.isScene!==!0&&(O=Ct),E.resetTextureUnits();const pt=O.fog,St=X.isMeshStandardMaterial?O.environment:null,Pt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Rn,Ot=(X.isMeshStandardMaterial?k:y).get(X.envMap||St),qt=X.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,kt=!!V.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Vt=!!V.morphAttributes.position,me=!!V.morphAttributes.normal,Xe=!!V.morphAttributes.color;let be=Wn;X.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(be=v.toneMapping);const _n=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,he=_n!==void 0?_n.length:0,Yt=Gt.get(X),Nr=p.state.lights;if(Z===!0&&(ht===!0||b!==S)){const Ke=b===S&&X.id===z;Ht.setState(X,b,Ke)}let fe=!1;X.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==Nr.state.version||Yt.outputColorSpace!==Pt||H.isBatchedMesh&&Yt.batching===!1||!H.isBatchedMesh&&Yt.batching===!0||H.isInstancedMesh&&Yt.instancing===!1||!H.isInstancedMesh&&Yt.instancing===!0||H.isSkinnedMesh&&Yt.skinning===!1||!H.isSkinnedMesh&&Yt.skinning===!0||H.isInstancedMesh&&Yt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Yt.instancingColor===!1&&H.instanceColor!==null||Yt.envMap!==Ot||X.fog===!0&&Yt.fog!==pt||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==Ht.numPlanes||Yt.numIntersection!==Ht.numIntersection)||Yt.vertexAlphas!==qt||Yt.vertexTangents!==kt||Yt.morphTargets!==Vt||Yt.morphNormals!==me||Yt.morphColors!==Xe||Yt.toneMapping!==be||Nt.isWebGL2===!0&&Yt.morphTargetsCount!==he)&&(fe=!0):(fe=!0,Yt.__version=X.version);let $n=Yt.currentProgram;fe===!0&&($n=Ns(X,O,H));let vo=!1,ss=!1,Fr=!1;const Re=$n.getUniforms(),jn=Yt.uniforms;if(_t.useProgram($n.program)&&(vo=!0,ss=!0,Fr=!0),X.id!==z&&(z=X.id,ss=!0),vo||S!==b){Re.setValue(G,"projectionMatrix",b.projectionMatrix),Re.setValue(G,"viewMatrix",b.matrixWorldInverse);const Ke=Re.map.cameraPosition;Ke!==void 0&&Ke.setValue(G,Bt.setFromMatrixPosition(b.matrixWorld)),Nt.logarithmicDepthBuffer&&Re.setValue(G,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Re.setValue(G,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,ss=!0,Fr=!0)}if(H.isSkinnedMesh){Re.setOptional(G,H,"bindMatrix"),Re.setOptional(G,H,"bindMatrixInverse");const Ke=H.skeleton;Ke&&(Nt.floatVertexTextures?(Ke.boneTexture===null&&Ke.computeBoneTexture(),Re.setValue(G,"boneTexture",Ke.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(Re.setOptional(G,H,"batchingTexture"),Re.setValue(G,"batchingTexture",H._matricesTexture,E));const Or=V.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0&&Nt.isWebGL2===!0)&&Xt.update(H,V,$n),(ss||Yt.receiveShadow!==H.receiveShadow)&&(Yt.receiveShadow=H.receiveShadow,Re.setValue(G,"receiveShadow",H.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(jn.envMap.value=Ot,jn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),ss&&(Re.setValue(G,"toneMappingExposure",v.toneMappingExposure),Yt.needsLights&&hh(jn,Fr),pt&&X.fog===!0&&ut.refreshFogUniforms(jn,pt),ut.refreshMaterialUniforms(jn,X,q,D,vt),gr.upload(G,go(Yt),jn,E)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(gr.upload(G,go(Yt),jn,E),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Re.setValue(G,"center",H.center),Re.setValue(G,"modelViewMatrix",H.modelViewMatrix),Re.setValue(G,"normalMatrix",H.normalMatrix),Re.setValue(G,"modelMatrix",H.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Ke=X.uniformsGroups;for(let zr=0,dh=Ke.length;zr<dh;zr++)if(Nt.isWebGL2){const xo=Ke[zr];at.update(xo,$n),at.bind(xo,$n)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return $n}function hh(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function uh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,O,V){Gt.get(b.texture).__webglTexture=O,Gt.get(b.depthTexture).__webglTexture=V;const X=Gt.get(b);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=V===void 0,X.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,O){const V=Gt.get(b);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,V=0){A=b,L=O,T=V;let X=!0,H=null,pt=!1,St=!1;if(b){const Ot=Gt.get(b);Ot.__useDefaultFramebuffer!==void 0?(_t.bindFramebuffer(G.FRAMEBUFFER,null),X=!1):Ot.__webglFramebuffer===void 0?E.setupRenderTarget(b):Ot.__hasExternalTextures&&E.rebindTextures(b,Gt.get(b.texture).__webglTexture,Gt.get(b.depthTexture).__webglTexture);const qt=b.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(St=!0);const kt=Gt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(kt[O])?H=kt[O][V]:H=kt[O],pt=!0):Nt.isWebGL2&&b.samples>0&&E.useMultisampledRTT(b)===!1?H=Gt.get(b).__webglMultisampledFramebuffer:Array.isArray(kt)?H=kt[V]:H=kt,w.copy(b.viewport),W.copy(b.scissor),I=b.scissorTest}else w.copy(K).multiplyScalar(q).floor(),W.copy(J).multiplyScalar(q).floor(),I=rt;if(_t.bindFramebuffer(G.FRAMEBUFFER,H)&&Nt.drawBuffers&&X&&_t.drawBuffers(b,H),_t.viewport(w),_t.scissor(W),_t.setScissorTest(I),pt){const Ot=Gt.get(b.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ot.__webglTexture,V)}else if(St){const Ot=Gt.get(b.texture),qt=O||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ot.__webglTexture,V||0,qt)}z=-1},this.readRenderTargetPixels=function(b,O,V,X,H,pt,St){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Gt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&St!==void 0&&(Pt=Pt[St]),Pt){_t.bindFramebuffer(G.FRAMEBUFFER,Pt);try{const Ot=b.texture,qt=Ot.format,kt=Ot.type;if(qt!==ln&&ft.convert(qt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Vt=kt===Ss&&(wt.has("EXT_color_buffer_half_float")||Nt.isWebGL2&&wt.has("EXT_color_buffer_float"));if(kt!==Xn&&ft.convert(kt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(kt===kn&&(Nt.isWebGL2||wt.has("OES_texture_float")||wt.has("WEBGL_color_buffer_float")))&&!Vt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-X&&V>=0&&V<=b.height-H&&G.readPixels(O,V,X,H,ft.convert(qt),ft.convert(kt),pt)}finally{const Ot=A!==null?Gt.get(A).__webglFramebuffer:null;_t.bindFramebuffer(G.FRAMEBUFFER,Ot)}}},this.copyFramebufferToTexture=function(b,O,V=0){const X=Math.pow(2,-V),H=Math.floor(O.image.width*X),pt=Math.floor(O.image.height*X);E.setTexture2D(O,0),G.copyTexSubImage2D(G.TEXTURE_2D,V,0,0,b.x,b.y,H,pt),_t.unbindTexture()},this.copyTextureToTexture=function(b,O,V,X=0){const H=O.image.width,pt=O.image.height,St=ft.convert(V.format),Pt=ft.convert(V.type);E.setTexture2D(V,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,V.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,V.unpackAlignment),O.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,X,b.x,b.y,H,pt,St,Pt,O.image.data):O.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,X,b.x,b.y,O.mipmaps[0].width,O.mipmaps[0].height,St,O.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,X,b.x,b.y,St,Pt,O.image),X===0&&V.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),_t.unbindTexture()},this.copyTextureToTexture3D=function(b,O,V,X,H=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const pt=b.max.x-b.min.x+1,St=b.max.y-b.min.y+1,Pt=b.max.z-b.min.z+1,Ot=ft.convert(X.format),qt=ft.convert(X.type);let kt;if(X.isData3DTexture)E.setTexture3D(X,0),kt=G.TEXTURE_3D;else if(X.isDataArrayTexture||X.isCompressedArrayTexture)E.setTexture2DArray(X,0),kt=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,X.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,X.unpackAlignment);const Vt=G.getParameter(G.UNPACK_ROW_LENGTH),me=G.getParameter(G.UNPACK_IMAGE_HEIGHT),Xe=G.getParameter(G.UNPACK_SKIP_PIXELS),be=G.getParameter(G.UNPACK_SKIP_ROWS),_n=G.getParameter(G.UNPACK_SKIP_IMAGES),he=V.isCompressedTexture?V.mipmaps[H]:V.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,he.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,he.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,b.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,b.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,b.min.z),V.isDataTexture||V.isData3DTexture?G.texSubImage3D(kt,H,O.x,O.y,O.z,pt,St,Pt,Ot,qt,he.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(kt,H,O.x,O.y,O.z,pt,St,Pt,Ot,he.data)):G.texSubImage3D(kt,H,O.x,O.y,O.z,pt,St,Pt,Ot,qt,he),G.pixelStorei(G.UNPACK_ROW_LENGTH,Vt),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,me),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Xe),G.pixelStorei(G.UNPACK_SKIP_ROWS,be),G.pixelStorei(G.UNPACK_SKIP_IMAGES,_n),H===0&&X.generateMipmaps&&G.generateMipmap(kt),_t.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),_t.unbindTexture()},this.resetState=function(){L=0,T=0,A=null,_t.reset(),C.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===no?"display-p3":"srgb",e.unpackColorSpace=ae.workingColorSpace===Pr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ue?ai:Ic}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===ai?ue:Rn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class t0 extends th{}t0.prototype.isWebGL1Renderer=!0;class oo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new oo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class e0 extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class n0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ga,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ne=new R;class Ar{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=fn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=fn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=fn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=fn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ie(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ar(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class lo extends Ln{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ii;const hs=new R,Ni=new R,Fi=new R,Oi=new Et,us=new Et,eh=new ce,rr=new R,ds=new R,ar=new R,Yl=new Et,xa=new Et,$l=new Et;class co extends xe{constructor(t=new lo){if(super(),this.isSprite=!0,this.type="Sprite",Ii===void 0){Ii=new se;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new n0(e,5);Ii.setIndex([0,1,2,0,2,3]),Ii.setAttribute("position",new Ar(n,3,0,!1)),Ii.setAttribute("uv",new Ar(n,2,3,!1))}this.geometry=Ii,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ni.setFromMatrixScale(this.matrixWorld),eh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Fi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ni.multiplyScalar(-Fi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;or(rr.set(-.5,-.5,0),Fi,a,Ni,s,r),or(ds.set(.5,-.5,0),Fi,a,Ni,s,r),or(ar.set(.5,.5,0),Fi,a,Ni,s,r),Yl.set(0,0),xa.set(1,0),$l.set(1,1);let o=t.ray.intersectTriangle(rr,ds,ar,!1,hs);if(o===null&&(or(ds.set(-.5,.5,0),Fi,a,Ni,s,r),xa.set(0,1),o=t.ray.intersectTriangle(rr,ar,ds,!1,hs),o===null))return;const l=t.ray.origin.distanceTo(hs);l<t.near||l>t.far||e.push({distance:l,point:hs.clone(),uv:Je.getInterpolation(hs,rr,ds,ar,Yl,xa,$l,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function or(i,t,e,n,s,r){Oi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(us.x=r*Oi.x-s*Oi.y,us.y=s*Oi.x+r*Oi.y):us.copy(Oi),i.copy(t),i.x+=us.x,i.y+=us.y,i.applyMatrix4(eh)}class Ve extends Ln{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const jl=new R,Kl=new R,Zl=new ce,Ma=new Ls,lr=new Cs;class ns extends xe{constructor(t=new se,e=new Ve){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)jl.fromBufferAttribute(e,s-1),Kl.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=jl.distanceTo(Kl);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(s),lr.radius+=r,t.ray.intersectsSphere(lr)===!1)return;Zl.copy(s).invert(),Ma.copy(t.ray).applyMatrix4(Zl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new R,h=new R,d=new R,f=new R,m=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const u=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let v=u,x=M-1;v<x;v+=m){const L=g.getX(v),T=g.getX(v+1);if(c.fromBufferAttribute(p,L),h.fromBufferAttribute(p,T),Ma.distanceSqToSegment(c,h,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const z=t.ray.origin.distanceTo(f);z<t.near||z>t.far||e.push({distance:z,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),M=Math.min(p.count,a.start+a.count);for(let v=u,x=M-1;v<x;v+=m){if(c.fromBufferAttribute(p,v),h.fromBufferAttribute(p,v+1),Ma.distanceSqToSegment(c,h,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const T=t.ray.origin.distanceTo(f);T<t.near||T>t.far||e.push({distance:T,point:d.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Jl=new R,Ql=new R;class oi extends ns{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Jl.fromBufferAttribute(e,s),Ql.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Jl.distanceTo(Ql);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nh extends ns{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Xa extends Ln{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const tc=new ce,qa=new Ls,cr=new Cs,hr=new R;class Ya extends xe{constructor(t=new se,e=new Xa){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(s),cr.radius+=r,t.ray.intersectsSphere(cr)===!1)return;tc.copy(s).invert(),qa.copy(t.ray).applyMatrix4(tc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);hr.fromBufferAttribute(d,p),ec(hr,p,l,s,t,e,this)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=f,_=m;g<_;g++)hr.fromBufferAttribute(d,g),ec(hr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ec(i,t,e,n,s,r,a){const o=qa.distanceSqToPoint(i);if(o<e){const l=new R;qa.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}class Ts extends Be{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ui extends se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new R,h=new Et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const m=n+d/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(o,3)),this.setAttribute("uv",new ne(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ui(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Qi extends se{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],f=[],m=[];let g=0;const _=[],p=n/2;let u=0;M(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ne(d,3)),this.setAttribute("normal",new ne(f,3)),this.setAttribute("uv",new ne(m,2));function M(){const x=new R,L=new R;let T=0;const A=(e-t)/n;for(let z=0;z<=r;z++){const S=[],w=z/r,W=w*(e-t)+t;for(let I=0;I<=s;I++){const j=I/s,P=j*l+o,F=Math.sin(P),D=Math.cos(P);L.x=W*F,L.y=-w*n+p,L.z=W*D,d.push(L.x,L.y,L.z),x.set(F,A,D).normalize(),f.push(x.x,x.y,x.z),m.push(j,1-w),S.push(g++)}_.push(S)}for(let z=0;z<s;z++)for(let S=0;S<r;S++){const w=_[S][z],W=_[S+1][z],I=_[S+1][z+1],j=_[S][z+1];h.push(w,W,j),h.push(W,I,j),T+=6}c.addGroup(u,T,0),u+=T}function v(x){const L=g,T=new Et,A=new R;let z=0;const S=x===!0?t:e,w=x===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,p*w,0),f.push(0,w,0),m.push(.5,.5),g++;const W=g;for(let I=0;I<=s;I++){const P=I/s*l+o,F=Math.cos(P),D=Math.sin(P);A.x=S*D,A.y=p*w,A.z=S*F,d.push(A.x,A.y,A.z),f.push(0,w,0),T.x=F*.5+.5,T.y=D*.5*w+.5,m.push(T.x,T.y),g++}for(let I=0;I<s;I++){const j=L+I,P=W+I;x===!0?h.push(P,P+1,j):h.push(P+1,P,j),z+=3}c.addGroup(u,z,x===!0?1:2),u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ws extends Qi{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ws(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Rr extends se{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=t;const f=(e-t)/s,m=new R,g=new Et;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){const u=r+p/n*a;m.x=d*Math.cos(u),m.y=d*Math.sin(u),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}d+=f}for(let _=0;_<s;_++){const p=_*(n+1);for(let u=0;u<n;u++){const M=u+p,v=M,x=M+n+1,L=M+n+2,T=M+1;o.push(v,x,T),o.push(x,L,T)}}this.setIndex(o),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(c,3)),this.setAttribute("uv",new ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Me extends se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new R,f=new R,m=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){const M=[],v=u/n;let x=0;u===0&&a===0?x=.5/e:u===n&&l===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){const T=L/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+v*o),d.y=t*Math.cos(a+v*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+v*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(T+x,1-v),M.push(c++)}h.push(M)}for(let u=0;u<n;u++)for(let M=0;M<e;M++){const v=h[u][M+1],x=h[u][M],L=h[u+1][M],T=h[u+1][M+1];(u!==0||a>0)&&m.push(v,x,T),(u!==n-1||l<Math.PI)&&m.push(x,L,T)}this.setIndex(m),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ya extends Ln{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eo,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nc extends Ln{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eo,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ih extends Ve{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}const ic={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class i0{constructor(t,e,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){const m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const s0=new i0;class ho{constructor(t){this.manager=t!==void 0?t:s0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ho.DEFAULT_MATERIAL_NAME="__DEFAULT";class r0 extends ho{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,a=ic.get(t);if(a!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;const o=Es("img");function l(){h(),ic.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),s&&s(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o}}class a0 extends ho{constructor(t){super(t)}load(t,e,n,s){const r=new Be,a=new r0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class sh extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class o0 extends sh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Sa=new ce,sc=new R,rc=new R;class l0{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ro,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;sc.setFromMatrixPosition(t.matrixWorld),e.position.copy(sc),rc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rc),e.updateMatrixWorld(),Sa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class c0 extends l0{constructor(){super(new Yc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class h0 extends sh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new c0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class u0{constructor(t,e,n=0,s=1/0){this.ray=new Ls(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new so,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,n=[]){return $a(t,this,n,e),n.sort(ac),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)$a(t[s],this,n,e);return n.sort(ac),n}}function ac(i,t){return i.distance-t.distance}function $a(i,t,e,n){if(i.layers.test(t.layers)&&i.raycast(t,e),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)$a(s[r],t,e,!0)}}class oc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ue(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ja);const lc={type:"change"},ba={type:"start"},cc={type:"end"},ur=new Ls,hc=new zn,d0=Math.cos(70*On.DEG2RAD);class f0 extends di{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gi.ROTATE,MIDDLE:gi.DOLLY,RIGHT:gi.PAN},this.touches={ONE:_i.ROTATE,TWO:_i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",Rt),this._domElementKeyEvents=C},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Rt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(lc),n.update(),r=s.NONE},this.update=function(){const C=new R,at=new Yn().setFromUnitVectors(t.up,new R(0,1,0)),yt=at.clone().invert(),mt=new R,et=new Yn,U=new R,ot=2*Math.PI;return function(Lt=null){const At=n.object.position;C.copy(At).sub(n.target),C.applyQuaternion(at),o.setFromVector3(C),n.autoRotate&&r===s.NONE&&I(w(Lt)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Zt=n.minAzimuthAngle,Jt=n.maxAzimuthAngle;isFinite(Zt)&&isFinite(Jt)&&(Zt<-Math.PI?Zt+=ot:Zt>Math.PI&&(Zt-=ot),Jt<-Math.PI?Jt+=ot:Jt>Math.PI&&(Jt-=ot),Zt<=Jt?o.theta=Math.max(Zt,Math.min(Jt,o.theta)):o.theta=o.theta>(Zt+Jt)/2?Math.max(Zt,o.theta):Math.min(Jt,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&T||n.object.isOrthographicCamera?o.radius=K(o.radius):o.radius=K(o.radius*c),C.setFromSpherical(o),C.applyQuaternion(yt),At.copy(n.target).add(C),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0));let de=!1;if(n.zoomToCursor&&T){let pe=null;if(n.object.isPerspectiveCamera){const Qt=C.length();pe=K(Qt*c);const ge=Qt-pe;n.object.position.addScaledVector(x,ge),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qt=new R(L.x,L.y,0);Qt.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),de=!0;const ge=new R(L.x,L.y,0);ge.unproject(n.object),n.object.position.sub(ge).add(Qt),n.object.updateMatrixWorld(),pe=C.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;pe!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(pe).add(n.object.position):(ur.origin.copy(n.object.position),ur.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ur.direction))<d0?t.lookAt(n.target):(hc.setFromNormalAndCoplanarPoint(n.object.up,n.target),ur.intersectPlane(hc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),de=!0);return c=1,T=!1,de||mt.distanceToSquared(n.object.position)>a||8*(1-et.dot(n.object.quaternion))>a||U.distanceToSquared(n.target)>0?(n.dispatchEvent(lc),mt.copy(n.object.position),et.copy(n.object.quaternion),U.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",ee),n.domElement.removeEventListener("pointerdown",E),n.domElement.removeEventListener("pointercancel",k),n.domElement.removeEventListener("wheel",it),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",k),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Rt),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new oc,l=new oc;let c=1;const h=new R,d=new Et,f=new Et,m=new Et,g=new Et,_=new Et,p=new Et,u=new Et,M=new Et,v=new Et,x=new R,L=new Et;let T=!1;const A=[],z={};let S=!1;function w(C){return C!==null?2*Math.PI/60*n.autoRotateSpeed*C:2*Math.PI/60/60*n.autoRotateSpeed}function W(C){const at=Math.abs(C*.01);return Math.pow(.95,n.zoomSpeed*at)}function I(C){l.theta-=C}function j(C){l.phi-=C}const P=function(){const C=new R;return function(yt,mt){C.setFromMatrixColumn(mt,0),C.multiplyScalar(-yt),h.add(C)}}(),F=function(){const C=new R;return function(yt,mt){n.screenSpacePanning===!0?C.setFromMatrixColumn(mt,1):(C.setFromMatrixColumn(mt,0),C.crossVectors(n.object.up,C)),C.multiplyScalar(yt),h.add(C)}}(),D=function(){const C=new R;return function(yt,mt){const et=n.domElement;if(n.object.isPerspectiveCamera){const U=n.object.position;C.copy(U).sub(n.target);let ot=C.length();ot*=Math.tan(n.object.fov/2*Math.PI/180),P(2*yt*ot/et.clientHeight,n.object.matrix),F(2*mt*ot/et.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(P(yt*(n.object.right-n.object.left)/n.object.zoom/et.clientWidth,n.object.matrix),F(mt*(n.object.top-n.object.bottom)/n.object.zoom/et.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function q(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function N(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(C,at){if(!n.zoomToCursor)return;T=!0;const yt=n.domElement.getBoundingClientRect(),mt=C-yt.left,et=at-yt.top,U=yt.width,ot=yt.height;L.x=mt/U*2-1,L.y=-(et/ot)*2+1,x.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function K(C){return Math.max(n.minDistance,Math.min(n.maxDistance,C))}function J(C){d.set(C.clientX,C.clientY)}function rt(C){$(C.clientX,C.clientX),u.set(C.clientX,C.clientY)}function Y(C){g.set(C.clientX,C.clientY)}function Z(C){f.set(C.clientX,C.clientY),m.subVectors(f,d).multiplyScalar(n.rotateSpeed);const at=n.domElement;I(2*Math.PI*m.x/at.clientHeight),j(2*Math.PI*m.y/at.clientHeight),d.copy(f),n.update()}function ht(C){M.set(C.clientX,C.clientY),v.subVectors(M,u),v.y>0?q(W(v.y)):v.y<0&&N(W(v.y)),u.copy(M),n.update()}function vt(C){_.set(C.clientX,C.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),D(p.x,p.y),g.copy(_),n.update()}function dt(C){$(C.clientX,C.clientY),C.deltaY<0?N(W(C.deltaY)):C.deltaY>0&&q(W(C.deltaY)),n.update()}function It(C){let at=!1;switch(C.code){case n.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?j(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):D(0,n.keyPanSpeed),at=!0;break;case n.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?j(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):D(0,-n.keyPanSpeed),at=!0;break;case n.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?I(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):D(n.keyPanSpeed,0),at=!0;break;case n.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?I(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):D(-n.keyPanSpeed,0),at=!0;break}at&&(C.preventDefault(),n.update())}function Bt(C){if(A.length===1)d.set(C.pageX,C.pageY);else{const at=ft(C),yt=.5*(C.pageX+at.x),mt=.5*(C.pageY+at.y);d.set(yt,mt)}}function Ct(C){if(A.length===1)g.set(C.pageX,C.pageY);else{const at=ft(C),yt=.5*(C.pageX+at.x),mt=.5*(C.pageY+at.y);g.set(yt,mt)}}function Kt(C){const at=ft(C),yt=C.pageX-at.x,mt=C.pageY-at.y,et=Math.sqrt(yt*yt+mt*mt);u.set(0,et)}function G(C){n.enableZoom&&Kt(C),n.enablePan&&Ct(C)}function we(C){n.enableZoom&&Kt(C),n.enableRotate&&Bt(C)}function wt(C){if(A.length==1)f.set(C.pageX,C.pageY);else{const yt=ft(C),mt=.5*(C.pageX+yt.x),et=.5*(C.pageY+yt.y);f.set(mt,et)}m.subVectors(f,d).multiplyScalar(n.rotateSpeed);const at=n.domElement;I(2*Math.PI*m.x/at.clientHeight),j(2*Math.PI*m.y/at.clientHeight),d.copy(f)}function Nt(C){if(A.length===1)_.set(C.pageX,C.pageY);else{const at=ft(C),yt=.5*(C.pageX+at.x),mt=.5*(C.pageY+at.y);_.set(yt,mt)}p.subVectors(_,g).multiplyScalar(n.panSpeed),D(p.x,p.y),g.copy(_)}function _t(C){const at=ft(C),yt=C.pageX-at.x,mt=C.pageY-at.y,et=Math.sqrt(yt*yt+mt*mt);M.set(0,et),v.set(0,Math.pow(M.y/u.y,n.zoomSpeed)),q(v.y),u.copy(M);const U=(C.pageX+at.x)*.5,ot=(C.pageY+at.y)*.5;$(U,ot)}function oe(C){n.enableZoom&&_t(C),n.enablePan&&Nt(C)}function Gt(C){n.enableZoom&&_t(C),n.enableRotate&&wt(C)}function E(C){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(C.pointerId),n.domElement.addEventListener("pointermove",y),n.domElement.addEventListener("pointerup",k)),Xt(C),C.pointerType==="touch"?Ht(C):nt(C))}function y(C){n.enabled!==!1&&(C.pointerType==="touch"?Q(C):tt(C))}function k(C){Ft(C),A.length===0&&(n.domElement.releasePointerCapture(C.pointerId),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",k)),n.dispatchEvent(cc),r=s.NONE}function nt(C){let at;switch(C.button){case 0:at=n.mouseButtons.LEFT;break;case 1:at=n.mouseButtons.MIDDLE;break;case 2:at=n.mouseButtons.RIGHT;break;default:at=-1}switch(at){case gi.DOLLY:if(n.enableZoom===!1)return;rt(C),r=s.DOLLY;break;case gi.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enablePan===!1)return;Y(C),r=s.PAN}else{if(n.enableRotate===!1)return;J(C),r=s.ROTATE}break;case gi.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enableRotate===!1)return;J(C),r=s.ROTATE}else{if(n.enablePan===!1)return;Y(C),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(ba)}function tt(C){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;Z(C);break;case s.DOLLY:if(n.enableZoom===!1)return;ht(C);break;case s.PAN:if(n.enablePan===!1)return;vt(C);break}}function it(C){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(C.preventDefault(),n.dispatchEvent(ba),dt(xt(C)),n.dispatchEvent(cc))}function xt(C){const at=C.deltaMode,yt={clientX:C.clientX,clientY:C.clientY,deltaY:C.deltaY};switch(at){case 1:yt.deltaY*=16;break;case 2:yt.deltaY*=100;break}return C.ctrlKey&&!S&&(yt.deltaY*=10),yt}function ut(C){C.key==="Control"&&(S=!0,document.addEventListener("keyup",gt,{passive:!0,capture:!0}))}function gt(C){C.key==="Control"&&(S=!1,document.removeEventListener("keyup",gt,{passive:!0,capture:!0}))}function Rt(C){n.enabled===!1||n.enablePan===!1||It(C)}function Ht(C){switch(bt(C),A.length){case 1:switch(n.touches.ONE){case _i.ROTATE:if(n.enableRotate===!1)return;Bt(C),r=s.TOUCH_ROTATE;break;case _i.PAN:if(n.enablePan===!1)return;Ct(C),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case _i.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;G(C),r=s.TOUCH_DOLLY_PAN;break;case _i.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;we(C),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(ba)}function Q(C){switch(bt(C),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;wt(C),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Nt(C),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;oe(C),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Gt(C),n.update();break;default:r=s.NONE}}function ee(C){n.enabled!==!1&&C.preventDefault()}function Xt(C){A.push(C.pointerId)}function Ft(C){delete z[C.pointerId];for(let at=0;at<A.length;at++)if(A[at]==C.pointerId){A.splice(at,1);return}}function bt(C){let at=z[C.pointerId];at===void 0&&(at=new Et,z[C.pointerId]=at),at.set(C.pageX,C.pageY)}function ft(C){const at=C.pointerId===A[0]?A[1]:A[0];return z[at]}n.domElement.addEventListener("contextmenu",ee),n.domElement.addEventListener("pointerdown",E),n.domElement.addEventListener("pointercancel",k),n.domElement.addEventListener("wheel",it,{passive:!1}),document.addEventListener("keydown",ut,{passive:!0,capture:!0}),this.update()}}function $e(i,t,e=1,n=new R){const s=i*Tt,r=t*Tt;return n.set(Math.cos(s)*Math.cos(r)*e,Math.sin(s)*e,-Math.cos(s)*Math.sin(r)*e)}function Ge(i,t,e=1,n=new R){const s=i*Tt,r=t*Tt;return n.set(Math.sin(r)*Math.cos(s)*e,Math.sin(s)*e,-Math.cos(r)*Math.cos(s)*e)}function ja(i,t,e=1,n=new R){const s=i*Tt,r=t*Tt;return n.set(Math.cos(r)*Math.cos(s)*e,Math.sin(r)*e,-Math.cos(r)*Math.sin(s)*e)}function Pe(i,t={}){const e=t.color??"#ffffff",n=t.height??.1,s=64,r=10,a=document.createElement("canvas"),o=a.getContext("2d");let l=new Ts(a);l.colorSpace=ue,l.minFilter=De,l.magFilter=De,l.generateMipmaps=!1;const c=new lo({map:l,transparent:!0,depthWrite:!1,depthTest:!0}),h=new co(c);t.center&&h.center.set(t.center[0],t.center[1]),h.renderOrder=10;const d=(m,g)=>{o.font=g;const _=[...m];let p=0;for(let u=0;u<_.length;u++)p+=o.measureText(_[u]).width,u<_.length-1&&(p+=r);return{chars:_,w:Math.ceil(p)}},f=m=>{const g=`${t.bold?700:500} ${s}px "DM Sans","Noto Serif SC","PingFang SC","Microsoft YaHei",sans-serif`,{chars:_,w:p}=d(m,g),u=28,M=22,v=Math.max(p+u*2,48),x=s+M*2;a.width=v,a.height=x,l.dispose(),l=new Ts(a),l.colorSpace=ue,l.minFilter=De,l.magFilter=De,l.generateMipmaps=!1,l.needsUpdate=!0,c.map=l,c.needsUpdate=!0,o.setTransform(1,0,0,1,0,0),o.clearRect(0,0,v,x),o.font=g,o.textBaseline="middle",o.textAlign="left",t.bg&&(o.fillStyle=t.bg,o.beginPath(),o.roundRect(6,6,v-12,x-12,14),o.fill());const L=x/2+1;let T=u;o.lineWidth=5,o.strokeStyle="rgba(2,6,16,0.9)",o.lineJoin="round",o.miterLimit=2,o.fillStyle=e;for(let A=0;A<_.length;A++){const z=_[A];o.strokeText(z,T,L),o.fillText(z,T,L),T+=o.measureText(z).width+r}h.scale.set(v/x*n,n,1)};return f(i),h.userData={text:i,isLabel:!0,setText:m=>{m!==h.userData.text&&(h.userData.text=m,f(m))}},h}function p0(i){i.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;if(n){const s=Array.isArray(n)?n:[n];for(const r of s)r.map?.dispose(),r.dispose()}})}function Fn(i,t=128,e="xz",n=0){const s=[];for(let r=0;r<t;r++){const a=r/t*Math.PI*2;s.push(e==="xz"?new R(Math.cos(a)*i,n,-Math.sin(a)*i):new R(Math.cos(a)*i,Math.sin(a)*i,n))}return s}function rn(i,t,e=1,n=!1,s=.05,r=.04){const a=new se().setFromPoints(i),o=n?new ih({color:t,transparent:!0,opacity:e,dashSize:s,gapSize:r,depthWrite:!1}):new Ve({color:t,transparent:!0,opacity:e,depthWrite:!1}),l=new nh(a,o);return n&&l.computeLineDistances(),l}function dn(i,t,e=1,n=!1,s=.05,r=.04){const a=new se().setFromPoints(i),o=n?new ih({color:t,transparent:!0,opacity:e,dashSize:s,gapSize:r,depthWrite:!1}):new Ve({color:t,transparent:!0,opacity:e,depthWrite:!1}),l=new ns(a,o);return n&&l.computeLineDistances(),l}class Wi extends Dt{shaft;head;constructor(t,e=.008,n=.04){super();const s=new ve({color:t});this.shaft=new jt(new Qi(e,e,1,8).translate(0,.5,0),s),this.head=new jt(new ws(n*.45,n,12).translate(0,n/2,0),s),this.add(this.shaft,this.head),this.setLength(.3)}setLength(t){this.shaft.scale.y=Math.max(t,1e-4),this.head.position.y=t}pointTo(t){this.quaternion.setFromUnitVectors(new R(0,1,0),t.clone().normalize())}}let fs=null;function m0(){if(fs)return fs;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.15,"rgba(255,240,200,0.9)"),e.addColorStop(.4,"rgba(255,200,100,0.35)"),e.addColorStop(1,"rgba(255,170,60,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),fs=new Ts(i),fs.colorSpace=ue,fs}function As(i,t,e=1){const n=new lo({map:m0(),color:i,transparent:!0,opacity:e,depthWrite:!1,blending:Yi}),s=new co(n);return s.scale.set(t,t,1),s}function uo(i){let t=i;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Ka=`
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vUv = uv;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vPosW = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,g0=`
uniform sampler2D uDay;
uniform sampler2D uNight;
uniform sampler2D uSpec;
uniform vec3 uSunDir;
uniform float uTerm;
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  float ndl = dot(N, uSunDir);
  vec3 day = texture2D(uDay, vUv).rgb;
  vec3 night = texture2D(uNight, vUv).rgb;
  float spec = texture2D(uSpec, vUv).r;

  float lit = smoothstep(-0.06, 0.32, ndl);
  vec3 col = day * (0.02 + 1.12 * lit);
  // 晨昏蒙影处偏暖
  float tw = exp(-pow(ndl / 0.12, 2.0));
  col += vec3(1.0, 0.42, 0.18) * day * tw * 0.35 * smoothstep(-0.2, 0.05, ndl);
  // 夜侧：微弱的星光轮廓 + 城市灯光
  float nightMask = 1.0 - smoothstep(-0.14, 0.04, ndl);
  col += day * vec3(0.012, 0.022, 0.05);
  col += night * vec3(1.0, 0.72, 0.38) * 1.7 * nightMask;
  // 海面高光
  vec3 R = reflect(-uSunDir, N);
  float s = pow(max(dot(R, V), 0.0), 55.0) * spec * lit;
  col += vec3(1.0, 0.95, 0.85) * s * 0.7;
  // 边缘大气
  float rim = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  col += vec3(0.22, 0.48, 1.0) * rim * (0.08 + 0.55 * lit);
  // 晨昏线高亮
  float tl = 1.0 - smoothstep(0.0, 1.6 * fwidth(ndl) + 1e-4, abs(ndl));
  col = mix(col, vec3(1.0, 0.72, 0.25), tl * uTerm * 0.85);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`,_0=`
uniform sampler2D uClouds;
uniform vec3 uSunDir;
uniform float uOpacity;
varying vec2 vUv;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vec3 N = normalize(vNormalW);
  float ndl = dot(N, uSunDir);
  vec4 c = texture2D(uClouds, vUv);
  float cl = min(dot(c.rgb, vec3(0.3333)), c.a);
  float lit = smoothstep(-0.12, 0.3, ndl);
  vec3 col = vec3(1.0) * (0.015 + 1.0 * lit);
  col += vec3(1.0, 0.5, 0.25) * exp(-pow(ndl / 0.1, 2.0)) * 0.25 * lit;
  gl_FragColor = vec4(col, cl * uOpacity);
  #include <colorspace_fragment>
}
`,v0=`
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vPosW = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,x0=`
uniform vec3 uSunDir;
uniform float uC0;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vPosW);
  float c = clamp(-dot(N, V), 0.0, 1.0);
  float g = pow(clamp(c / uC0, 0.0, 1.0), 2.4);
  float lit = smoothstep(-0.4, 0.4, dot(N, uSunDir));
  vec3 col = mix(vec3(0.12, 0.28, 0.7), vec3(0.35, 0.65, 1.0), lit);
  gl_FragColor = vec4(col * g * (0.25 + 0.95 * lit), 1.0);
}
`,M0=`
uniform vec3 uSunDir;
varying vec3 vNormalW;
varying vec3 vPosW;
void main() {
  vec3 N = normalize(vNormalW);
  float ndl = dot(N, uSunDir);
  float lit = smoothstep(-0.03, 0.06, ndl);
  vec3 col = mix(vec3(0.02, 0.05, 0.12), vec3(0.22, 0.5, 0.95), lit * (0.6 + 0.4 * ndl));
  vec3 V = normalize(cameraPosition - vPosW);
  col += vec3(0.3, 0.55, 1.0) * pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.4;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;function y0(){return new je({vertexShader:Ka,fragmentShader:M0,uniforms:{uSunDir:{value:new R(1,0,0)}}})}function dr(i,t,e){let n=i*374761393+t*668265263+e*1442695041|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function S0(i,t,e){const n=Math.floor(i),s=Math.floor(t),r=i-n,a=t-s,o=r*r*(3-2*r),l=a*a*(3-2*a),c=dr(n,s,e),h=dr(n+1,s,e),d=dr(n,s+1,e),f=dr(n+1,s+1,e);return c+(h-c)*o+(d-c)*l+(c-h-d+f)*o*l}function Ea(i,t,e){let n=0,s=.5,r=1;for(let a=0;a<5;a++)n+=s*S0(i*r,t*r,e+a),s*=.5,r*=2;return n}function b0(){const e=()=>{const c=document.createElement("canvas");c.width=512,c.height=256;const h=c.getContext("2d");return{c,ctx:h,img:h.createImageData(512,256)}},n=e(),s=e(),r=e(),a=e(),o=uo(7);for(let c=0;c<256;c++){const h=90-c/256*180;for(let d=0;d<512;d++){const f=(c*512+d)*4,m=Ea(d/512*6,c/256*3.5,3),g=m>.54-Math.abs(h)*4e-4,_=Math.abs(h)>72+m*8;let p,u,M;if(_)[p,u,M]=[235,240,245];else if(g){const T=Math.max(0,1-Math.abs(h-25)/20);p=70+T*110+m*30,u=110+T*40-m*20,M=55+T*10}else[p,u,M]=[8+m*20,40+m*50,95+m*60];n.img.data.set([p,u,M,255],f);const v=g&&!_&&Math.abs(h)<60&&o()<.06*Ea(d/512*20,c/256*10,9)*2;s.img.data.set(v?[255,200,120,255]:[0,0,0,255],f),r.img.data.set(g?[0,0,0,255]:[255,255,255,255],f);const x=Ea(d/512*8,c/256*5,21),L=Math.max(0,(x-.5)*3)*255;a.img.data.set([255,255,255,Math.min(255,L)],f)}}const l=(c,h)=>{c.ctx.putImageData(c.img,0,0);const d=new Ts(c.c);return h&&(d.colorSpace=ue),d.wrapS=Ki,d};return{day:l(n,!0),night:l(s,!0),spec:l(r,!1),clouds:l(a,!0)}}const E0={high:{day:"textures/day.jpg",night:"textures/night.png",spec:"textures/spec.jpg",clouds:"textures/clouds.png"},medium:{day:"textures/day_2k.jpg",night:"textures/night.png",spec:"textures/spec.jpg",clouds:"textures/clouds_1k.png"},low:{day:"textures/day_2k.jpg",night:"textures/night.png",spec:"textures/spec.jpg",clouds:"textures/clouds_1k.png"}},ps={high:128,medium:80,low:40};class T0{root=new Dt;tilt=new Dt;spin=new Dt;uniforms={uSunDir:{value:new R(1,0,0)},uTerm:{value:1}};layerGroups={};labels=[];pickMesh;earthMat;cloudMat;cloudMesh;atmoMesh;fallback=b0();texKey="";maxAniso=4;terminatorGroup=new Dt;raysGroup=new Dt;subsolarGroup=new Dt;subsolarLabel;subsolarLine;obsGroup=new Dt;obsLabel;latCircle;meridianArc;obsMarker=new Dt;linGroup=new Dt;linArrows=[];timeLabels=[];lastMinute=-1;eclDisc;obliqNormal;obliqArc;obliqLabel;lastSubText="";lastObsKey="";constructor(){this.root.add(this.tilt),this.tilt.add(this.spin);const t=new Me(1,ps.high,ps.high/2);this.earthMat=new je({vertexShader:Ka,fragmentShader:g0,uniforms:{uDay:{value:this.fallback.day},uNight:{value:this.fallback.night},uSpec:{value:this.fallback.spec},uSunDir:this.uniforms.uSunDir,uTerm:this.uniforms.uTerm}});const e=new jt(t,this.earthMat);this.pickMesh=e,this.spin.add(e),this.cloudMat=new je({vertexShader:Ka,fragmentShader:_0,uniforms:{uClouds:{value:this.fallback.clouds},uSunDir:this.uniforms.uSunDir,uOpacity:{value:.8}},transparent:!0,depthWrite:!1}),this.cloudMesh=new jt(new Me(1.012,ps.high,ps.high/2),this.cloudMat),this.spin.add(this.cloudMesh),this.layerGroups.clouds=[this.cloudMesh];const n=new je({vertexShader:v0,fragmentShader:x0,uniforms:{uSunDir:this.uniforms.uSunDir,uC0:{value:Math.sqrt(1-1/(1.12*1.12))}},transparent:!0,blending:Yi,side:Ae,depthWrite:!1});this.atmoMesh=new jt(new Me(1.12,64,32),n),this.root.add(this.atmoMesh),this.buildAxis(),this.buildRotDir(),this.buildLatLines(),this.buildGraticule(),this.buildTerminator(),this.buildSubsolar(),this.buildRays(),this.buildLocalTime();const s=this.buildObserver();this.latCircle=s.latCircle,this.meridianArc=s.arc,this.obsLabel=s.label,this.buildLinSpeed();const r=this.buildObliquity();this.eclDisc=r.disc,this.obliqNormal=r.normal,this.obliqArc=r.arc,this.obliqLabel=r.label,this.subsolarLabel=this.subsolarGroup.getObjectByName("subLabel"),this.subsolarLine=this.subsolarGroup.getObjectByName("subLine")}addLabel(t,e,n,s="#ffffff",r=.1,a=!1){const o=Pe(e,{color:s,height:r,bold:a});return o.position.copy(n),t.add(o),this.labels.push(o),o}reg(t,e){(this.layerGroups[t]??=[]).push(e)}buildAxis(){const t=new Dt,e=dn([new R(0,-1.75,0),new R(0,1.75,0)],16765562,.95);t.add(e);const n=new jt(new ws(.035,.12,16),new ve({color:16747109}));n.position.y=1.78;const s=new jt(new ws(.03,.1,16),new ve({color:8368895}));s.position.y=-1.78,s.rotation.x=Math.PI,t.add(n,s),this.addLabel(t,"北极 N",new R(.28,2.05,0),"#ffb199",.12,!0),this.addLabel(t,"南极 S",new R(.28,-2.05,0),"#a9c8ff",.12,!0),this.addLabel(t,"地轴",new R(.42,1.35,0),"#ffd27a",.1),this.tilt.add(t),this.reg("axis",t)}buildRotDir(){const t=new Dt,e=rn(Fn(1.16,128),7268279,.5,!0,.06,.05);t.add(e);for(let a=0;a<4;a++){const o=a/4*Math.PI*2+.3,l=new Wi(7268279,.001,.12);l.shaft.visible=!1,l.setLength(0),l.position.set(Math.cos(o)*1.16,0,-Math.sin(o)*1.16),l.pointTo(new R(-Math.sin(o),0,-Math.cos(o))),t.add(l)}const n=[];for(let a=0;a<=40;a++){const o=a/40*Math.PI*1.5;n.push(new R(Math.cos(o)*.4,1.28,-Math.sin(o)*.4))}t.add(dn(n,7268279,.9));const s=Math.PI*1.5,r=new Wi(7268279,.001,.1);r.shaft.visible=!1,r.setLength(0),r.position.set(Math.cos(s)*.4,1.28,-Math.sin(s)*.4),r.pointTo(new R(-Math.sin(s),0,-Math.cos(s))),t.add(r),this.addLabel(t,"自转 自西向东",new R(-.55,1.62,.15),"#6ee7b7",.11,!0),this.spin.add(t),this.reg("rotDir",t)}buildLatLines(){const t=new Dt;t.add(rn(Fn(1.004,160),16739179,.95)),this.addLabel(t,"赤道 0°",$e(0,-40,1.05),"#ff9a9a",.075),this.spin.add(t),this.reg("equator",t);const e=cn,n=(a,o,l,c,h)=>{const d=new Dt,f=Math.cos(a*Tt)*1.004,m=Math.sin(a*Tt)*1.004;return d.add(rn(Fn(f,160,"xz",m),o,.9,c,.04,.03)),this.addLabel(d,l,$e(a,h,1.05),"#ffffff",.07),d},s=new Dt;s.add(n(e,16757575,"北回归线 23°26′N",!0,-40),n(-e,16757575,"南回归线 23°26′S",!0,-40)),this.spin.add(s),this.reg("tropics",s);const r=new Dt;r.add(n(90-e,8246268,"北极圈 66°34′N",!0,-40),n(-66.56071,8246268,"南极圈 66°34′S",!0,-40)),this.spin.add(r),this.reg("polar",r)}buildGraticule(){const t=[];for(let r=-75;r<=75;r+=15)if(r!==0)for(let a=0;a<96;a++){const o=$e(r,a/96*360,1.002),l=$e(r,(a+1)/96*360,1.002);t.push(o.x,o.y,o.z,l.x,l.y,l.z)}for(let r=0;r<360;r+=15)for(let a=0;a<48;a++){const o=$e(-90+a/48*180,r,1.002),l=$e(-90+(a+1)/48*180,r,1.002);t.push(o.x,o.y,o.z,l.x,l.y,l.z)}const n=new se;n.setAttribute("position",new ne(t,3));const s=new oi(n,new Ve({color:9419007,transparent:!0,opacity:.32,depthWrite:!1}));this.spin.add(s),this.reg("graticule",s)}buildTerminator(){const t=rn(Fn(1.007,180,"xy"),16757575,.95);this.terminatorGroup.add(t),this.addLabel(this.terminatorGroup,"晨昏线",new R(0,1.1,0),"#ffcf87",.085,!0),this.root.add(this.terminatorGroup),this.reg("terminator",this.terminatorGroup)}buildSubsolar(){const t=this.subsolarGroup,e=As(16766044,.5,.95);t.add(e);const n=new jt(new Me(.022,16,16),new ve({color:16774064}));t.add(n);const s=new jt(new Rr(.06,.07,40),new ve({color:16766044,side:ze,transparent:!0,opacity:.9,depthWrite:!1}));s.name="subRing",t.add(s);const r=this.addLabel(t,"太阳直射点",new R(0,.14,0),"#ffe28a",.085,!0);r.name="subLabel";const a=dn([new R(0,0,-1.012),new R(0,0,0)],16766044,.5,!0,.05,.04);a.name="subLine",t.add(a),this.root.add(t),this.reg("subsolar",t)}buildRays(){const t=[],e=[];for(let o=-1.2;o<=1.2001;o+=.24)for(let l=-1.2;l<=1.2001;l+=.24){const c=o*o+l*l;if(c>1.2*1.2)continue;const h=c<1?Math.sqrt(1-c):-3.4;t.push(o,l,3.4,o,l,h),e.push(0,0,0,1,.82,.3)}const r=new se;r.setAttribute("position",new ne(t,3)),r.setAttribute("color",new ne(e,3));const a=new oi(r,new Ve({vertexColors:!0,transparent:!0,blending:Yi,depthWrite:!1}));this.raysGroup.add(a);for(let o=0;o<5;o++){const l=-.8+o*.4,c=new Wi(16766044,.001,.1);c.shaft.visible=!1,c.setLength(0),c.position.set(-1.05,l,1.6),c.pointTo(new R(0,0,-1)),this.raysGroup.add(c)}this.root.add(this.raysGroup),this.reg("rays",this.raysGroup)}buildLocalTime(){const t=new Dt,e=[];for(let s=-180;s<180;s+=15)for(let r=0;r<48;r++){const a=$e(-90+r/48*180,s,1.004),o=$e(-90+(r+1)/48*180,s,1.004);e.push(a.x,a.y,a.z,o.x,o.y,o.z)}const n=new se;n.setAttribute("position",new ne(e,3)),t.add(new oi(n,new Ve({color:16765286,transparent:!0,opacity:.6,depthWrite:!1})));for(let s=-180;s<180;s+=15){const r=this.addLabel(t,"00:00",$e(0,s,1.075),"#ffe9a8",.062);this.timeLabels.push({sprite:r,lon:s})}this.spin.add(t),this.reg("localTime",t)}buildObserver(){const t=this.obsGroup,e=rn(Fn(1,160),2282478,.95);t.add(e);const n=new se().setFromPoints(Array.from({length:33},()=>new R)),s=new ns(n,new Ve({color:2282478,transparent:!0,opacity:.8,depthWrite:!1}));s.frustumCulled=!1,t.add(s);const r=this.obsMarker,a=new jt(new Me(.026,16,16),new ve({color:2282478}));a.position.y=.004;const o=dn([new R(0,0,0),new R(0,.14,0)],2282478,.95),l=new jt(new Rr(.045,.055,32).rotateX(-Math.PI/2),new ve({color:16777215,transparent:!0,opacity:.9,side:ze,depthWrite:!1}));l.position.y=.006;const c=As(2282478,.22,.8);c.position.y=.01,r.add(a,o,l,c);const h=Pe("观测点",{color:"#7df3ff",height:.15,bold:!0});return h.position.set(0,.32,0),r.add(h),this.labels.push(h),t.add(r),this.spin.add(t),this.reg("observer",t),{latCircle:e,arc:s,label:h}}buildLinSpeed(){const t=[0,30,60,-30,-60,0];t.forEach((e,n)=>{const s=n===t.length-1,r=new Wi(s?2282478:16755021,.009,.07),a=Pe("",{color:s?"#7df3ff":"#ffd0a0",height:.075,bold:!0});this.labels.push(a),this.linGroup.add(r,a),this.linArrows.push({arrow:r,label:a,lat:e})}),this.spin.add(this.linGroup),this.reg("linSpeed",this.linGroup)}buildObliquity(){const t=new Dt,e=new jt(new ui(2.3,96).rotateX(-Math.PI/2),new ve({color:16762941,transparent:!0,opacity:.16,side:ze,depthWrite:!1})),n=rn(Fn(2.3,128),16762941,.8),s=dn([new R(0,-2.2,0),new R(0,2.2,0)],16777215,.7,!0,.06,.05),r=[],a=cn*Tt;for(let d=0;d<=24;d++){const f=d/24*a;r.push(new R(0,Math.cos(f)*1.9,-Math.sin(f)*1.9))}const o=dn(r,16752451,1);t.add(e,n,s,o);const l=this.addLabel(t,"黄赤交角 23.44°",new R(0,2.18,-.55),"#ffc27a",.1,!0);this.addLabel(t,"黄道面",new R(2.1,.08,0),"#ffd86b",.085),this.addLabel(t,"黄道面法线",new R(0,-2.35,0),"#ffffff",.07),this.root.add(t),this.reg("obliquity",t);const c=new Dt,h=new jt(new ui(1.95,96).rotateX(-Math.PI/2),new ve({color:4891647,transparent:!0,opacity:.2,side:ze,depthWrite:!1}));return c.add(h,rn(Fn(1.95,128),4891647,.85)),this.addLabel(c,"赤道面",new R(-1.7,.08,.2),"#8dc4ff",.085),this.tilt.add(c),this.reg("obliquity",c),{disc:e,normal:s,arc:o,label:l}}setObserver(t,e,n){const s=`${t.toFixed(3)}|${e.toFixed(3)}|${n}`;if(s===this.lastObsKey)return;this.lastObsKey=s;const r=Math.cos(t*Tt)*1.006;this.latCircle.scale.set(r,1,r),this.latCircle.position.y=Math.sin(t*Tt)*1.006;const a=this.meridianArc.geometry.getAttribute("position"),o=a.count,l=new R;for(let c=0;c<o;c++)$e(t*c/(o-1),e,1.006,l),a.setXYZ(c,l.x,l.y,l.z);a.needsUpdate=!0,$e(t,e,1,l),this.obsMarker.position.copy(l),this.obsMarker.quaternion.setFromUnitVectors(new R(0,1,0),l.clone().normalize()),this.obsLabel.userData.setText(n||`观测点 ${Math.abs(t).toFixed(1)}°${t>=0?"N":"S"}`),this.updateLinSpeed(t,e)}updateLinSpeed(t,e){const n=new R,s=new R;this.linArrows.forEach((r,a)=>{const o=a===this.linArrows.length-1?t:r.lat,l=(a===this.linArrows.length-1,e);$e(o,l,1.012,s),n.set(-Math.sin(l*Tt),0,-Math.cos(l*Tt)),r.arrow.position.copy(s),r.arrow.pointTo(n);const c=Math.cos(o*Tt);r.arrow.setLength(Math.max(.02,.38*c)),r.label.position.copy(s).addScaledVector(n,.38*c+.12).multiplyScalar(1).add(s.clone().normalize().multiplyScalar(.06)),r.label.userData.setText(`${Math.round(Gi(o)).toLocaleString("zh-CN")} km/h`)})}setMaxAnisotropy(t){this.maxAniso=t}async setQuality(t){const e=ps[t];this.pickMesh.geometry.dispose(),this.pickMesh.geometry=new Me(1,e,e/2),this.cloudMesh.geometry.dispose(),this.cloudMesh.geometry=new Me(1.012,e,e/2);const n=E0[t],s=`${n.day}|${n.clouds}`;if(s===this.texKey)return;this.texKey=s;const r=new a0,a="/earth/",o=async(m,g)=>{try{const _=await r.loadAsync(a+m);return g&&(_.colorSpace=ue),_.anisotropy=this.maxAniso,_.wrapS=Ki,_.needsUpdate=!0,_}catch{return null}},[l,c,h,d]=await Promise.all([o(n.day,!0),o(n.night,!0),o(n.spec,!1),o(n.clouds,!0)]);if(s!==this.texKey)return;const f=(m,g,_)=>{g?(m.value!==_&&m.value!==this.fallback.day&&m.value.dispose(),m.value=g):m.value=_};f(this.earthMat.uniforms.uDay,l,this.fallback.day),f(this.earthMat.uniforms.uNight,c,this.fallback.night),f(this.earthMat.uniforms.uSpec,h,this.fallback.spec),f(this.cloudMat.uniforms.uClouds,d,this.fallback.clouds)}update(t,e,n,s){this.tilt.rotation.x=-t.eps*Tt,this.spin.rotation.y=t.gmst*Tt,this.uniforms.uSunDir.value.copy(n),this.uniforms.uTerm.value=e.layers.terminator?1:0;const r=new Yn().setFromUnitVectors(new R(0,0,1),n);this.terminatorGroup.quaternion.copy(r),this.raysGroup.quaternion.copy(r),this.subsolarGroup.position.copy(n).multiplyScalar(1.012),this.subsolarGroup.quaternion.setFromUnitVectors(new R(0,0,1),n);const a=t.subLat,o=`太阳直射点 ${Math.abs(a).toFixed(1)}°${a>=0?"N":"S"}`;o!==this.lastSubText&&(this.lastSubText=o,this.subsolarLabel.userData.setText(o)),this.setObserver(e.lat,e.lon,e.city),this.obliqLabel.userData.setText(`黄赤交角 ${t.eps.toFixed(2)}°`);const l=Math.floor(s/6e4);if(e.layers.localTime&&l!==this.lastMinute){this.lastMinute=l;const c=(s/36e5%24+24)%24;for(const h of this.timeLabels){const d=((c+h.lon/15)%24+24)%24,f=Math.floor(d*60)%1440;h.sprite.userData.setText(`${String(Math.floor(f/60)).padStart(2,"0")}:${String(f%60).padStart(2,"0")}`)}}}observerWorldDir(t,e,n){return $e(t,e,1,n),n.applyMatrix4(new ce().extractRotation(this.spin.matrixWorld))}worldPointToLatLon(t){const e=this.spin.worldToLocal(t.clone()).normalize(),n=Math.asin(Math.max(-1,Math.min(1,e.y)))/Tt,s=Math.atan2(-e.z,e.x)/Tt;return{lat:n,lon:s}}}const w0=60,A0=10;function ki(i,t,e=new R){const n=gh*(t?A0:1),s=(i-mh)*Tt,r=(1-n*n)/(1+n*Math.cos(s))*w0,a=i*Tt;return e.set(Math.cos(a)*r,0,-Math.sin(a)*r)}class R0{root=new Dt;layerGroups={};staticLabels=[];dynLabels=[];sunMesh;orbitGroup=new Dt;monthGroup=new Dt;apsideGroup=new Dt;seasonGroup=new Dt;disc;discMat;sunEarthLine;velArrow;velLabel;ghosts=[];builtKey="";constructor(){const t=new Dt,e=new jt(new Me(4.5,48,32),new ve({color:16769162}));t.add(e),t.add(As(16757575,34,.9)),t.add(As(16773568,16,1));const n=Pe("太阳",{color:"#ffe28a",height:2.6,bold:!0});n.position.set(0,8,0),t.add(n),this.staticLabels.push(n),this.sunMesh=t,this.root.add(t),this.discMat=new ve({color:16762941,transparent:!0,opacity:.06,side:ze,depthWrite:!1}),this.disc=new jt(new ui(88,128).rotateX(-Math.PI/2),this.discMat);const s=rn(Fn(88,160),16762941,.35),r=new Dt;r.add(this.disc,s);const a=Pe("黄道面（公转轨道面）",{color:"#ffd86b",height:2.4});a.position.set(-62,.5,62),r.add(a),this.staticLabels.push(a),this.root.add(r),this.reg("orbit",r),this.reg("obliquity",r),this.root.add(this.orbitGroup,this.monthGroup,this.apsideGroup,this.seasonGroup),this.reg("orbit",this.orbitGroup),this.reg("monthTicks",this.monthGroup),this.reg("apsides",this.apsideGroup),this.reg("seasons",this.seasonGroup),this.sunEarthLine=dn([new R,new R(1,0,0)],16765562,.35,!0,1.2,.8),this.sunEarthLine.frustumCulled=!1;const o=new Dt;o.add(this.sunEarthLine),this.velArrow=new Wi(7268279,.16,2.2),this.velLabel=Pe("公转方向",{color:"#6ee7b7",height:2.2,bold:!0}),this.staticLabels.push(this.velLabel),o.add(this.velArrow,this.velLabel),this.root.add(o),this.reg("orbit",o)}allLabels(){return[...this.staticLabels,...this.dynLabels]}reg(t,e){(this.layerGroups[t]??=[]).push(e)}rebuild(t,e){const n=e.beijing?8:0,s=He(t,n).year,r=e.layers.exaggerate,a=`${s}|${r}|${n}`;if(a===this.builtKey)return;this.builtKey=a;for(const p of[this.orbitGroup,this.monthGroup,this.apsideGroup,this.seasonGroup])for(const u of[...p.children])p.remove(u),p0(u);this.dynLabels=[],this.ghosts=[];const o=new R,l=[];for(let p=0;p<360;p++)l.push(ki(p,r).clone());this.orbitGroup.add(rn(l,6003711,.95));for(const p of[20,140,260]){const u=ki(p,r),M=new Wi(7268279,.1,2.4);M.shaft.visible=!1,M.setLength(0),M.position.copy(u);const v=p*Tt;M.pointTo(new R(-Math.sin(v),0,-Math.cos(v))),this.orbitGroup.add(M)}for(let p=0;p<12;p++){const u=Date.UTC(s,p,1),M=ie(u);ki(M.earthLon,r,o);const v=o.clone().normalize();this.monthGroup.add(dn([o.clone().addScaledVector(v,-1.3),o.clone().addScaledVector(v,1.5)],13227775,.9));const x=Pe(`${p+1}月`,{color:"#dbe5ff",height:2.6,bold:!0});x.position.copy(o).addScaledVector(v,5.2),this.monthGroup.add(x),this.dynLabels.push(x)}const c=ts(s),h=(p,u,M,v)=>{const x=ie(p),L=ki(x.earthLon,r),T=new jt(new Me(1,20,16),new ve({color:M}));T.position.copy(L),this.apsideGroup.add(T);const A=L.clone().normalize(),z=Pe(`${u} ${xr(p,n)} · ${(x.distKm/1e8).toFixed(3)}亿 km`,{color:v,height:2.5,bold:!0});return z.position.copy(L).addScaledVector(A,11),z.position.y+=2,this.apsideGroup.add(z),this.dynLabels.push(z),L},d=h(c.perihelion,"近日点",16743001,"#ffab94"),f=h(c.aphelion,"远日点",6993919,"#a5d0ff");this.apsideGroup.add(dn([d,f],16777215,.35,!0,1.5,1));const m=cn*Tt,g=new R(0,Math.cos(m),-Math.sin(m)),_=[[c.marEquinox,"春分"],[c.junSolstice,"夏至"],[c.sepEquinox,"秋分"],[c.decSolstice,"冬至"]];for(const[p,u]of _){const M=ie(p),v=ki(M.earthLon,r),x=new Dt;x.position.copy(v);const L=y0();L.uniforms.uSunDir.value.copy(v).negate().normalize(),x.add(new jt(new Me(2.7,32,20),L)),x.add(dn([g.clone().multiplyScalar(-5.2),g.clone().multiplyScalar(5.2)],16765562,.95));const T=Pe(`${u} ${xr(p,n)}`,{color:"#ffe9b0",height:2.8,bold:!0});T.position.set(0,8,0),x.add(T);const A=Pe("N",{color:"#ffb199",height:2,bold:!0});A.position.copy(g).multiplyScalar(6.6),x.add(A),this.dynLabels.push(T,A),this.seasonGroup.add(x),this.ghosts.push({holder:x,pos:v.clone()})}}update(t,e,n,s){this.rebuild(e.time,e),this.discMat.opacity=e.layers.obliquity?.14:.055;for(const c of this.ghosts)c.holder.visible=c.pos.distanceTo(n)>7;const r=this.sunEarthLine.geometry.getAttribute("position");r.setXYZ(1,n.x,n.y,n.z),r.needsUpdate=!0,this.sunEarthLine.computeLineDistances();const a=t.earthLon*Tt,o=new R(-Math.sin(a),0,-Math.cos(a)),l=n.clone().normalize();this.velArrow.position.copy(n).addScaledVector(l,0).addScaledVector(new R(0,1,0),0),this.velArrow.pointTo(o),this.velArrow.setLength(8),this.velLabel.position.copy(n).addScaledVector(o,12).addScaledVector(l,3),this.velLabel.userData.setText(`公转方向 ${t.v.toFixed(2)} km/s`),this.root.visible=s==="orbit"||s==="earth"}setSunScale(t){this.sunMesh.scale.setScalar(t)}}const rh=[{id:"sirius",cn:"天狼星",ra:6.752,dec:-16.716,mag:-1.46,label:!0},{id:"canopus",cn:"老人星",ra:6.399,dec:-52.696,mag:-.74,label:!0},{id:"arcturus",cn:"大角星",ra:14.261,dec:19.182,mag:-.05,label:!0},{id:"vega",cn:"织女星",ra:18.616,dec:38.784,mag:.03,label:!0},{id:"capella",cn:"五车二",ra:5.278,dec:45.998,mag:.08,label:!0},{id:"rigel",cn:"参宿七",ra:5.242,dec:-8.202,mag:.13,label:!0},{id:"procyon",cn:"南河三",ra:7.655,dec:5.225,mag:.34,label:!0},{id:"betelgeuse",cn:"参宿四",ra:5.919,dec:7.407,mag:.5,label:!0},{id:"altair",cn:"牛郎星",ra:19.846,dec:8.868,mag:.77,label:!0},{id:"aldebaran",cn:"毕宿五",ra:4.599,dec:16.509,mag:.85,label:!0},{id:"antares",cn:"心宿二",ra:16.49,dec:-26.432,mag:1.06,label:!0},{id:"spica",cn:"角宿一",ra:13.42,dec:-11.161,mag:.97,label:!0},{id:"pollux",cn:"北河三",ra:7.755,dec:28.026,mag:1.14,label:!0},{id:"fomalhaut",cn:"北落师门",ra:22.961,dec:-29.622,mag:1.16,label:!0},{id:"deneb",cn:"天津四",ra:20.69,dec:45.28,mag:1.25,label:!0},{id:"regulus",cn:"轩辕十四",ra:10.139,dec:11.967,mag:1.35,label:!0},{id:"polaris",cn:"北极星",ra:2.53,dec:89.264,mag:1.98,label:!0},{id:"acen",cn:"南门二",ra:14.66,dec:-60.835,mag:-.01,label:!0},{id:"acrux",cn:"十字架二",ra:12.443,dec:-63.099,mag:.76,label:!0},{id:"mimosa",cn:"十字架三",ra:12.795,dec:-59.689,mag:1.25},{id:"gacrux",cn:"十字架一",ra:12.519,dec:-57.113,mag:1.64},{id:"delcru",cn:"δ Cru",ra:12.252,dec:-58.749,mag:2.8},{id:"dubhe",cn:"天枢",ra:11.062,dec:61.751,mag:1.79,label:!0},{id:"merak",cn:"天璇",ra:11.031,dec:56.382,mag:2.37},{id:"phecda",cn:"天玑",ra:11.897,dec:53.695,mag:2.44},{id:"megrez",cn:"天权",ra:12.257,dec:57.033,mag:3.31},{id:"alioth",cn:"玉衡",ra:12.9,dec:55.96,mag:1.77},{id:"mizar",cn:"开阳",ra:13.399,dec:54.925,mag:2.27},{id:"alkaid",cn:"摇光",ra:13.792,dec:49.313,mag:1.86},{id:"alnitak",cn:"参宿一",ra:5.679,dec:-1.943,mag:1.77},{id:"alnilam",cn:"参宿二",ra:5.604,dec:-1.202,mag:1.69},{id:"mintaka",cn:"参宿三",ra:5.533,dec:-.299,mag:2.23},{id:"bellatrix",cn:"参宿五",ra:5.419,dec:6.35,mag:1.64},{id:"saiph",cn:"参宿六",ra:5.796,dec:-9.67,mag:2.06},{id:"schedar",cn:"王良四",ra:.675,dec:56.537,mag:2.24},{id:"caph",cn:"王良一",ra:.153,dec:59.15,mag:2.27},{id:"gcas",cn:"γ Cas",ra:.945,dec:60.717,mag:2.47},{id:"ruchbah",cn:"阁道三",ra:1.43,dec:60.235,mag:2.68},{id:"segin",cn:"ε Cas",ra:1.907,dec:63.67,mag:3.38},{id:"sargas",cn:"尾宿八",ra:17.622,dec:-42.998,mag:1.87},{id:"shaula",cn:"尾宿五",ra:17.56,dec:-37.104,mag:1.63}],C0=[["dubhe","merak"],["merak","phecda"],["phecda","megrez"],["megrez","dubhe"],["megrez","alioth"],["alioth","mizar"],["mizar","alkaid"],["alnitak","alnilam"],["alnilam","mintaka"],["betelgeuse","bellatrix"],["bellatrix","mintaka"],["betelgeuse","alnitak"],["rigel","mintaka"],["saiph","alnitak"],["rigel","saiph"],["caph","schedar"],["schedar","gcas"],["gcas","ruchbah"],["ruchbah","segin"],["acrux","gacrux"],["mimosa","delcru"],["vega","altair"],["altair","deneb"],["deneb","vega"],["antares","shaula"],["shaula","sargas"]],L0=`
attribute float aSize;
attribute vec4 aColor;
uniform float uPixelRatio;
uniform float uSizeMul;
varying vec4 vColor;
void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio * uSizeMul;
}
`,P0=`
uniform float uBrightness;
varying vec4 vColor;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d) * 2.0;
  float a = smoothstep(1.0, 0.0, r);
  a = a * a * (0.35 + 0.65 * smoothstep(0.7, 0.0, r));
  gl_FragColor = vec4(vColor.rgb, vColor.a * a * uBrightness);
}
`;function D0(i){const t=i();return t<.55?new zt(1,1,1).lerp(new zt(.85,.9,1),i()):t<.75?new zt(.7,.8,1):t<.9?new zt(1,.95,.75):new zt(1,.72,.5)}function U0(i,t){const e=i*Tt,n=t*Tt,s=Math.cos(n)*Math.cos(e),r=Math.cos(n)*Math.sin(e),a=Math.sin(n),o=-.0548755604*s+.4941094279*r-.867666149*a,l=-.8734370902*s-.44482963*r-.1980763734*a,c=-.4838350155*s+.7469822445*r+.4559837762*a,h=(Math.atan2(l,o)*Gn+360)%360,d=Math.asin(Math.max(-1,Math.min(1,c)))*Gn;return[h,d]}function ah(i,t=1){const e=uo(20240607),n=[],s=[],r=[],a=new R;for(let u=0;u<2600;u++){const M=e()*2-1,v=e()*Math.PI*2,x=Math.sqrt(1-M*M);a.set(Math.cos(v)*x,M,-Math.sin(v)*x).multiplyScalar(i),n.push(a.x,a.y,a.z);const L=2+Math.pow(e(),.6)*4.2,T=Math.pow(10,-.4*(L-2));s.push(1.1+Math.min(1.8,T*1.6));const A=D0(e);r.push(A.r,A.g,A.b,Math.min(1,.25+T*.55))}let o=0;for(;o<7e3;){const u=e()*360,M=u>180?u-360:u,v=.18+.82*Math.exp(-(M*M)/(2*55*55));if(e()>v)continue;const L=(e()+e()+e()-1.5)*2*(6+5*Math.exp(-(M*M)/(2*40*40))),[T,A]=U0(u,L);ja(T,A,i,a),n.push(a.x,a.y,a.z),s.push(1.6+e()*2.2);const z=Math.exp(-(M*M)/(2*30*30)),S=(.05+.1*e())*(.6+.8*z)*Math.exp(-(L*L)/180);r.push(.75+.25*z,.78+.1*z,1-.25*z,S),o++}const l=new Map;for(const u of rh){ja(u.ra*15,u.dec,i,a),l.set(u.id,a.clone()),n.push(a.x,a.y,a.z);const M=Math.pow(10,-.4*(u.mag-1));s.push(Math.min(9,3.4+M*2.6));const v=new zt(1,.97,.92);(u.id==="rigel"||u.id==="vega"||u.id==="sirius")&&v.set(.82,.9,1),(u.id==="betelgeuse"||u.id==="antares"||u.id==="aldebaran")&&v.set(1,.7,.5),r.push(v.r,v.g,v.b,1)}const c=new se;c.setAttribute("position",new ne(n,3)),c.setAttribute("aSize",new ne(s,1)),c.setAttribute("aColor",new ne(r,4));const h=new je({vertexShader:L0,fragmentShader:P0,uniforms:{uBrightness:{value:1},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uSizeMul:{value:t}},transparent:!0,depthWrite:!1,blending:Yi}),d=new Ya(c,h);d.frustumCulled=!1;const f=[];for(const[u,M]of C0){const v=l.get(u),x=l.get(M);v&&x&&f.push(v.x,v.y,v.z,x.x,x.y,x.z)}const m=new se;m.setAttribute("position",new ne(f,3));const g=new Ve({color:8366335,transparent:!0,opacity:.22,depthWrite:!1}),_=new oi(m,g);_.frustumCulled=!1;const p=new Dt;return p.add(d,_),{group:p,points:d,lines:_,material:h,setBrightness(u){h.uniforms.uBrightness.value=u,g.opacity=.22*u},setPixelRatio(u){h.uniforms.uPixelRatio.value=u}}}const te=10,I0=50,N0=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,F0=`
uniform vec3 uSunDir;
varying vec3 vDir;
void main() {
  vec3 dir = normalize(vDir);
  float h = max(dir.y, 0.0);
  float sunAlt = uSunDir.y;
  float day = smoothstep(-0.14, 0.12, sunAlt);
  float twi = exp(-pow((sunAlt + 0.04) / 0.13, 2.0));
  float hf = pow(1.0 - h, 3.0);

  vec3 zenithDay = vec3(0.045, 0.19, 0.62);
  vec3 horizonDay = vec3(0.42, 0.62, 0.92);
  vec3 zenithNight = vec3(0.001, 0.003, 0.012);
  vec3 horizonNight = vec3(0.012, 0.02, 0.045);
  vec3 col = mix(mix(zenithNight, horizonNight, hf), mix(zenithDay, horizonDay, hf), day);

  float sd = max(dot(dir, normalize(uSunDir)), 0.0);
  // 蒙影：地平线附近朝向太阳一侧发橙红
  vec3 twiCol = mix(vec3(1.0, 0.38, 0.1), vec3(1.0, 0.6, 0.3), day);
  col += twiCol * twi * (pow(sd, 3.0) * 0.55 + hf * 0.28 * (0.4 + 0.6 * sd));
  // 光晕与日轮
  col += vec3(1.0, 0.82, 0.55) * pow(sd, 48.0) * 0.55 * smoothstep(-0.1, 0.1, sunAlt);
  col += vec3(1.0, 0.9, 0.7) * pow(sd, 400.0) * 1.4 * smoothstep(-0.05, 0.05, sunAlt);
  float disc = smoothstep(0.99988, 0.99994, sd);
  col = mix(col, vec3(1.0, 0.96, 0.85) * 6.0, disc * smoothstep(-0.03, 0.02, sunAlt + 0.0));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;class Ta{constructor(t,e){this.count=t,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3);const n=new se;n.setAttribute("position",new Ie(this.pos,3)),n.setAttribute("color",new Ie(this.col,3));const s=new Ve({vertexColors:!0});this.obj=e?new nh(n,s):new ns(n,s),this.obj.frustumCulled=!1}obj;pos;col;set(t,e,n,s,r){this.pos[t*3]=e.x,this.pos[t*3+1]=e.y,this.pos[t*3+2]=e.z,this.col[t*3]=n,this.col[t*3+1]=s,this.col[t*3+2]=r}flush(){const t=this.obj.geometry;t.getAttribute("position").needsUpdate=!0,t.getAttribute("color").needsUpdate=!0}}function O0(){const i=document.createElement("canvas");i.width=i.height=256;const t=i.getContext("2d");t.fillStyle="#4a6a3c",t.fillRect(0,0,256,256);const e=uo(5);for(let s=0;s<6e3;s++){const r=40+e()*60;t.fillStyle=`rgba(${r*.9},${r*1.5},${r*.7},${.25+e()*.4})`,t.fillRect(e()*256,e()*256,1+e()*3,1+e()*3)}const n=new Ts(i);return n.colorSpace=ue,n.wrapS=n.wrapT=Ki,n.repeat.set(400,400),n.anisotropy=8,n}class z0{root=new Dt;layerGroups={};sunLight=new h0(16773853,3);ambient=new o0(9417983,3820074,.5);fogColor=new zt;sunAlt=0;sunAz=0;sunDir=new R(0,1,0);content=new Dt;eqGroup=new Dt;stars;labels=[];dynLabels=[];sphereDecor=new Dt;immersiveDecor=new Dt;skyMat;skyDome;sunMarker=new Dt;sunGlow;sunLabel;todayLine;hourDots;hourPos=new Float32Array(24*3);seasonLines=[];seasonLabels=[];analemmaLine;analemmaPts;analemmaLabels=[];gnomonGroup=new Dt;pole;shadow;tipTrace;tipMarker;tipTraceCount=61;mode="sphere";keys={today:"",season:"",analemma:""};constructor(){this.root.add(this.content),this.content.add(this.eqGroup),this.stars=ah(te*.98,1),this.eqGroup.add(this.stars.group),this.reg("stars",this.stars.group),this.buildEquatorial(),this.buildHorizon(),this.buildAltAzGrid(),this.buildSunMarker(),this.sunGlow=this.sunMarker.children.find(o=>o instanceof co),this.sunLabel=this.sunMarker.getObjectByName("sunLabel"),this.todayLine=this.buildTodayPath(),this.hourDots=this.buildHourDots(),this.buildSeasonPaths();const t=this.buildAnalemma();this.analemmaLine=t.line,this.analemmaPts=t.pts,this.skyMat=new je({vertexShader:N0,fragmentShader:F0,uniforms:{uSunDir:{value:this.sunDir}},side:Ae,depthWrite:!1,depthTest:!1}),this.skyDome=new jt(new Me(1800,48,24),this.skyMat),this.skyDome.renderOrder=-10,this.skyDome.frustumCulled=!1,this.immersiveDecor.add(this.skyDome);const e=new jt(new ui(2400,64).rotateX(-Math.PI/2),new nc({map:O0(),color:16777215}));e.name="ground",this.immersiveDecor.add(e),this.root.add(this.immersiveDecor);const n=new jt(new Me(te,64,32,0,Math.PI*2,0,Math.PI/2),new ve({color:5209046,transparent:!0,opacity:.1,side:Ae,depthWrite:!1})),s=new jt(new ui(te,96).rotateX(-Math.PI/2),new nc({color:2375724,transparent:!0,opacity:.85,side:ze}));s.position.y=-.01;const r=rn(Array.from({length:128},(o,l)=>{const c=l/128*Math.PI*2;return new R(Math.cos(c)*te,0,-Math.sin(c)*te)}),16777215,.8),a=new oi(new se().setFromPoints([new R(-te,.01,0),new R(te,.01,0),new R(0,.01,-te),new R(0,.01,te)]),new Ve({color:16777215,transparent:!0,opacity:.25}));this.sphereDecor.add(n,s,r,a),this.root.add(this.sphereDecor),this.buildGnomon(),this.root.add(this.gnomonGroup),this.root.add(this.sunLight,this.ambient),this.reg("gnomon",this.gnomonGroup)}reg(t,e){(this.layerGroups[t]??=[]).push(e)}label(t,e,n,s,r,a=!1){const o=Pe(e,{color:s,height:r,bold:a});return o.position.copy(n),t.add(o),this.labels.push(o),o}setPixelRatio(t){this.stars.setPixelRatio(t)}allLabels(){return[...this.labels,...this.dynLabels]}buildEquatorial(){const t=new Dt,e=[];for(let r=0;r<180;r++){const a=r/180*Math.PI*2;e.push(new R(Math.cos(a)*te*.99,0,-Math.sin(a)*te*.99))}t.add(rn(e,4891647,.95)),this.label(t,"天赤道",new R(te*.95,.5,-te*.35),"#8dc4ff",.5,!0);for(const r of[1,-1]){const a=new jt(new Me(.16,16,12),new ve({color:r>0?16751226:9291007}));a.position.set(0,r*te*.99,0),t.add(a),t.add(this.makeAxisSegment(r)),this.label(t,r>0?"北天极":"南天极",new R(0,r*te*1.06,0),r>0?"#ffb199":"#a9c8ff",.5,!0)}this.eqGroup.add(t),this.reg("celestialEq",t);const n=new Dt,s=new R;for(const r of rh){if(!r.label)continue;ja(r.ra*15,r.dec,te*.98,s);const a=Pe(r.cn,{color:r.id==="polaris"?"#ffd7a8":"#b8c8ff",height:.36});a.position.copy(s).multiplyScalar(1.02),a.position.y+=.3,n.add(a),this.labels.push(a)}this.stars.group.add(n)}makeAxisSegment(t){const e=new se().setFromPoints([new R(0,0,0),new R(0,t*te*.99,0)]);return new ns(e,new Ve({color:16765562,transparent:!0,opacity:.4}))}buildHorizon(){const t=new Dt,e=[["北 N",0,"#ffb3a3"],["东 E",90,"#ffffff"],["南 S",180,"#ffffff"],["西 W",270,"#ffffff"]];for(const[s,r,a]of e){const o=this.label(t,s,Ge(1.2,r,te*1.07),a,.75,!0);o.renderOrder=12}const n=[["东北",45],["东南",135],["西南",225],["西北",315]];for(const[s,r]of n)this.label(t,s,Ge(1.2,r,te*1.07),"#9fb2d6",.5);this.content.add(t)}buildAltAzGrid(){const t=new Dt,e=new Ve({color:4576448,transparent:!0,opacity:.3,depthWrite:!1}),n=[],s=(l,c)=>n.push(l.x,l.y,l.z,c.x,c.y,c.z);for(let l=0;l<=75;l+=15)for(let c=0;c<90;c++)s(Ge(l,c/90*360,te*.995),r((c+1)/90*360,l));function r(l,c){return Ge(c,l,te*.995)}for(let l=0;l<360;l+=30)for(let c=0;c<30;c++)s(Ge(c/30*90,l,te*.995),Ge((c+1)/30*90,l,te*.995));const a=new se;a.setAttribute("position",new ne(n,3)),t.add(new oi(a,e));for(let l=30;l<=60;l+=30)this.label(t,`${l}°`,Ge(l,186,te*.995),"#7fe3d3",.36);this.label(t,"天顶",new R(0,te*1.05,0),"#7fe3d3",.5,!0);const o=new jt(new Me(.12,12,8),new ve({color:8381395}));o.position.set(0,te*.995,0),t.add(o),this.content.add(t),this.reg("altazGrid",t)}buildSunMarker(){const t=new jt(new Me(.34,24,16),new ve({color:16769674}));t.name="sunCore",this.sunMarker.add(t),this.sunMarker.add(As(16757575,3.2,.95));const e=Pe("太阳",{color:"#ffe28a",height:.55,bold:!0});e.name="sunLabel",e.position.set(0,.85,0),this.sunMarker.add(e),this.labels.push(e),this.content.add(this.sunMarker)}buildTodayPath(){const t=new Ta(181,!0);return this.content.add(t.obj),this.reg("todayPath",t.obj),t}buildHourDots(){const t=new se;t.setAttribute("position",new Ie(this.hourPos,3));const e=new Ya(t,new Xa({color:16766044,size:6,sizeAttenuation:!1}));return e.frustumCulled=!1,this.content.add(e),this.reg("todayPath",e),e}buildSeasonPaths(){const t=new Dt;for(let s=0;s<3;s++){const r=new Ta(181,!0);this.seasonLines.push(r),t.add(r.obj)}const e=["夏至","春分·秋分","冬至"],n=["#ff9b78","#ffffff","#7dbcff"];e.forEach((s,r)=>{const a=Pe(s,{color:n[r],height:.5,bold:!0});t.add(a),this.seasonLabels.push(a),this.labels.push(a)}),this.content.add(t),this.reg("seasonPaths",t)}buildAnalemma(){const t=new Dt,e=new Ta(74,!1);t.add(e.obj);const n=new se;n.setAttribute("position",new Ie(new Float32Array(74*3),3));const s=new Ya(n,new Xa({color:16755021,size:5,sizeAttenuation:!1}));s.frustumCulled=!1,t.add(s);for(let r=0;r<12;r++){const a=Pe(`${r+1}月`,{color:"#ffd9a0",height:.34});t.add(a),this.analemmaLabels.push(a),this.labels.push(a)}return this.content.add(t),this.reg("analemma",t),{line:e,pts:s}}buildGnomon(){const t=new Dt,e=new jt(new Qi(.025,.035,1,12).translate(0,.5,0),new ya({color:15130575,roughness:.5,metalness:.2})),n=new jt(new Me(.06,12,8),new ya({color:16762941,emissive:5583616}));n.position.y=1;const s=new jt(new Qi(.1,.12,.03,16),new ya({color:9209204}));t.add(e,n,s),this.pole=t,this.gnomonGroup.add(t),this.shadow=new jt(new Ur(1,1).rotateX(-Math.PI/2).translate(.5,0,0),new ve({color:0,transparent:!0,opacity:.5,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),this.shadow.position.y=.01,this.gnomonGroup.add(this.shadow);const r=new se;r.setAttribute("position",new Ie(new Float32Array(this.tipTraceCount*6),3)),this.tipTrace=new oi(r,new Ve({color:16766044,transparent:!0,opacity:.85})),this.tipTrace.frustumCulled=!1,this.gnomonGroup.add(this.tipTrace),this.tipMarker=new jt(new Me(.06,10,8),new ve({color:16743001})),this.gnomonGroup.add(this.tipMarker);const a=Pe("竿影",{color:"#ffd9a0",height:.4,bold:!0});a.name="shadowLabel",this.gnomonGroup.add(a)}setMode(t){this.mode=t;const e=t==="immersive";this.content.scale.setScalar(e?I0:1),this.sphereDecor.visible=!e,this.immersiveDecor.visible=e,this.gnomonGroup.position.set(0,0,e?-6:0),this.pole.scale.setScalar(this.gnomonHeight()),this.sunMarker.getObjectByName("sunCore").visible=!e,this.sunGlow.visible=!e,this.stars.material.uniforms.uSizeMul.value=e?1:1.2,this.keys={today:"",season:"",analemma:""}}gnomonHeight(){return this.mode==="immersive"?2:1.2}update(t,e,n){const s=this.mode==="immersive",r=e.lat,a=e.lon,o=Pa(t,r,a),l=v=>e.refraction?v+Da(v):v;this.sunAlt=l(o.alt),this.sunAz=o.az,Ge(this.sunAlt,this.sunAz,1,this.sunDir);const c=(t.gmst+a)*Tt,h=r*Tt,d=new R(Math.cos(h)*Math.cos(c),Math.sin(h),-Math.cos(h)*Math.sin(c)),f=new R(-Math.sin(c),0,-Math.cos(c)),m=new R().crossVectors(d,f),g=new ce().set(f.x,f.y,f.z,0,d.x,d.y,d.z,0,-m.x,-m.y,-m.z,0,0,0,0,1);this.eqGroup.quaternion.setFromRotationMatrix(g),this.sunMarker.position.copy(this.sunDir).multiplyScalar(te*.97);const _=this.sunAlt<0;this.sunMarker.getObjectByName("sunCore").visible=!s,this.sunGlow.material.opacity=_?.25:.95,this.sunLabel.userData.setText(`太阳 ${this.sunAlt.toFixed(1)}°`);const p=this.sunDir.y,u=On.smoothstep(p,-.14,.12);this.sunLight.position.copy(this.sunDir).multiplyScalar(100),this.sunLight.intensity=3.2*On.smoothstep(p,-.02,.2),this.sunLight.color.setRGB(1,.8+.2*Math.min(1,p*3),.6+.4*Math.min(1,p*3)),this.ambient.intensity=(s?.06:.55)+(s?.9:.5)*u;const M=Math.exp(-Math.pow((p+.04)/.13,2));this.fogColor.setRGB(On.lerp(.012,.42,u)+.45*M*.5,On.lerp(.02,.62,u)+.2*M*.5,On.lerp(.045,.92,u)),this.stars.setBrightness(s?1-On.smoothstep(p,-.2,0):1),this.skyDome.position.copy(n),this.updateTodayPath(t,e,l),e.layers.seasonPaths&&this.updateSeasonPaths(t,e,l),e.layers.analemma&&this.updateAnalemma(e,l),this.updateGnomon(e)}updateTodayPath(t,e,n){const s=`${e.lat.toFixed(2)}|${t.dec.toFixed(2)}|${e.refraction}`;if(s!==this.keys.today){this.keys.today=s;const r=new R;for(let a=0;a<181;a++){const o=-180+a/180*360,{alt:l,az:c}=Tn(e.lat,t.dec,o);Ge(n(l),c,te*.97,r);const h=l>=0;this.todayLine.set(a,r,h?1:.35,h?.82:.3,h?.3:.2)}this.todayLine.flush();for(let a=0;a<24;a++){const{alt:o,az:l}=Tn(e.lat,t.dec,(a-12)*15);Ge(n(o),l,te*.97,r),this.hourPos[a*3]=r.x,this.hourPos[a*3+1]=r.y,this.hourPos[a*3+2]=r.z}this.hourDots.geometry.getAttribute("position").needsUpdate=!0}}updateSeasonPaths(t,e,n){const s=`${e.lat.toFixed(2)}|${e.refraction}|${t.eps.toFixed(2)}`;if(s===this.keys.season)return;this.keys.season=s;const r=[t.eps,0,-t.eps],a=[[1,.5,.35],[1,1,1],[.38,.66,1]],o=new R;r.forEach((l,c)=>{for(let f=0;f<181;f++){const m=-180+f/180*360,{alt:g,az:_}=Tn(e.lat,l,m);Ge(n(g),_,te*.975,o);const p=g>=0?1:.3;this.seasonLines[c].set(f,o,a[c][0]*p,a[c][1]*p,a[c][2]*p)}this.seasonLines[c].flush();const h=90-Math.abs(e.lat-l),d=e.lat>=l?180:0;this.seasonLabels[c].position.copy(Ge(n(Math.min(89,h))+2.5,d,te*.975)),this.seasonLabels[c].userData.setText(`${["夏至","春秋分","冬至"][c]} 正午${h.toFixed(1)}°`)})}updateAnalemma(t,e){const n=t.beijing?8:0,s=He(t.time,n),r=s.hour*60+s.minute,a=`${r}|${t.lat.toFixed(2)}|${t.lon.toFixed(2)}|${s.year}|${t.refraction}|${n}`;if(a===this.keys.analemma)return;this.keys.analemma=a;const o=li(s.year,n),l=new R,c=this.analemmaPts.geometry.getAttribute("position"),h=Array.from({length:12},(d,f)=>Math.round((Date.UTC(s.year,f,1)-Date.UTC(s.year,0,1))/We));for(let d=0;d<74;d++){const f=Math.min(365,d*5),m=o+f*We+r*6e4,g=ie(m),_=Pa(g,t.lat,t.lon);Ge(e(_.alt),_.az,te*.97,l),this.analemmaLine.set(d,l,1,.66,.3),c.setXYZ(d,l.x,l.y,l.z),h.forEach((p,u)=>{Math.abs(p-f)<2.5&&Math.abs(p-f)<=Math.abs(p-(f-5))&&(this.analemmaLabels[u].position.copy(l).multiplyScalar(1.03),this.analemmaLabels[u].position.y+=.35)})}this.analemmaLine.flush(),c.needsUpdate=!0}updateGnomon(t){const e=this.gnomonHeight();this.pole.scale.setScalar(e);const n=this.sunAlt,s=this.mode==="immersive"?40:9,r=new R(Math.sin(this.sunAz*Tt),0,-Math.cos(this.sunAz*Tt)),a=this.gnomonGroup.getObjectByName("shadowLabel");if(n>.8&&t.layers.gnomon){const l=Math.min(s,e/Math.tan(n*Tt)),c=-r.x,h=-r.z;this.shadow.visible=!0,this.shadow.scale.set(l,1,e*.12),this.shadow.rotation.y=Math.atan2(-h,c),this.tipMarker.visible=!0,this.tipMarker.position.set(c*l,.03,h*l),this.tipMarker.scale.setScalar(e),a.visible=t.layers.labels,a.position.set(c*l*.5,.4*e,h*l*.5),a.userData.setText(`影长 ${(l/e).toFixed(2)} 倍竿高`)}else this.shadow.visible=!1,this.tipMarker.visible=!1,a.visible=!1;const o=`${t.lat.toFixed(2)}|${this.keys.today}|${this.mode}`;if(this.gnomonGroup.userData.traceKey!==o){this.gnomonGroup.userData.traceKey=o;const l=Number(this.keys.today.split("|")[1]??0),c=this.tipTrace.geometry.getAttribute("position"),h=this.tipTraceCount,d=[];for(let m=0;m<h;m++){const g=-180+m/(h-1)*360,_=Tn(t.lat,l,g),p=t.refraction?_.alt+Da(_.alt):_.alt;if(p<3){d.push(null);continue}const u=Math.min(s,e/Math.tan(p*Tt));d.push(new R(-Math.sin(_.az*Tt)*u,.02,Math.cos(_.az*Tt)*u))}let f=0;for(let m=0;m<h-1;m++){const g=d[m],_=d[m+1];g&&_&&(c.setXYZ(f++,g.x,g.y,g.z),c.setXYZ(f++,_.x,_.y,_.z))}for(;f<h*2;f++)c.setXYZ(f,0,0,0);c.needsUpdate=!0}}}const wa=3.2,B0={high:2,medium:1.25,low:1},Aa=new R(0,1,0);function k0(i){return i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2}class G0{renderer;scene=new e0;camera;controls;earth=new T0;orbit=new R0;sky=new z0;spaceStars;spaceStarsRoot=new Dt;sun=ie(Date.now());earthPos=new R;sunDir=new R(1,0,0);earthScale=1;lastAnchor=new R;tween=null;view="earth";groundMode="sphere";container;down=null;quality="high";viewShift=0;readyPromise;resolveReady;constructor(t){this.container=t,this.readyPromise=new Promise(s=>{this.resolveReady=s}),this.renderer=new th({antialias:!0,powerPreference:"high-performance"}),this.renderer.setClearColor(132106),t.appendChild(this.renderer.domElement),this.renderer.domElement.className="scene-canvas",this.camera=new Qe(45,1,.05,6e3),this.scene.add(this.camera),this.controls=new f0(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.enablePan=!1,this.spaceStars=ah(1500,1),this.spaceStars.lines.visible=!1,this.spaceStarsRoot.add(this.spaceStars.group),this.scene.add(this.spaceStarsRoot),this.earth.setMaxAnisotropy(this.renderer.capabilities.getMaxAnisotropy()),this.scene.add(this.earth.root,this.orbit.root,this.sky.root),this.view=st.state.view,this.groundMode=st.state.groundMode,this.applyQuality(st.state.quality).finally(()=>this.resolveReady()),this.snapToView(!0),this.onResize(),new ResizeObserver(()=>this.onResize()).observe(t),window.addEventListener("resize",()=>this.onResize());const n=this.renderer.domElement;n.addEventListener("pointerdown",s=>{this.down={x:s.clientX,y:s.clientY,t:performance.now()}}),n.addEventListener("pointerup",s=>{const r=this.down;this.down=null,r&&Math.hypot(s.clientX-r.x,s.clientY-r.y)<5&&performance.now()-r.t<500&&this.pick(s)}),n.addEventListener("wheel",s=>{this.view==="ground"&&this.groundMode==="immersive"&&(s.preventDefault(),this.camera.fov=On.clamp(this.camera.fov+Math.sign(s.deltaY)*3,25,100),this.camera.updateProjectionMatrix())},{passive:!1}),st.subscribe((s,r)=>{if(s.has("quality")&&this.applyQuality(r.quality),s.has("view")||s.has("groundMode")){const a=this.view,o=this.groundMode;this.view=r.view,this.groundMode=r.groundMode,(a!==r.view||r.view==="ground"&&o!==r.groundMode)&&this.onViewChange(a)}s.has("introDone")&&(this.controls.autoRotate=!r.introDone&&r.view==="earth")}),this.controls.autoRotate=!st.state.introDone,this.controls.autoRotateSpeed=.5}whenReady(){return this.readyPromise}async applyQuality(t){this.quality=t;const e=Math.min(window.devicePixelRatio||1,B0[t]);this.renderer.setPixelRatio(e),this.spaceStars.setPixelRatio(e),this.sky.setPixelRatio(e),this.onResize(),await this.earth.setQuality(t)}onResize(){const t=this.container.clientWidth||window.innerWidth,e=this.container.clientHeight||window.innerHeight;this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.viewShift=NaN}updateViewShift(t){const e=st.state,n=this.container.clientWidth,s=this.container.clientHeight;let r=0;if(n>860&&!(e.view==="ground"&&e.groundMode==="immersive")&&e.introDone){const o=e.lessonOpen&&!e.hideUI?406:0,l=e.panelOpen&&!e.hideUI?408:0;r=(o-l)/2}Number.isNaN(this.viewShift)&&(this.viewShift=r+1);const a=this.viewShift+(r-this.viewShift)*Math.min(1,t*6);(Math.abs(a-this.viewShift)>.05||Math.abs(r-a)>.05)&&(this.viewShift=Math.abs(r-a)<.5?r:a,Math.abs(this.viewShift)<.5?this.camera.clearViewOffset():this.camera.setViewOffset(n,s,-this.viewShift,0,n,s))}anchor(t=new R){return this.view==="earth"?t.copy(this.earthPos):t.set(0,0,0)}earthOffset(t){const e=this.camera.aspect<.9?4.8:3.9,n=this.sunDir,s=this.sun.eps*Tt,r=new R(0,Math.cos(s),-Math.sin(s));let a;switch(t){case"observer":{a=this.earth.observerWorldDir(st.state.lat,st.state.lon,new R),Math.abs(a.y)>.96&&(a.x+=.3);break}case"sun":a=n.clone().applyAxisAngle(Aa,.25).add(new R(0,.25,0));break;case"pole":a=r.clone().add(new R(.12,0,.12));break;case"side":{const o=new R().crossVectors(n,r).normalize();new R().crossVectors(o.clone().negate(),Aa).dot(n)>0&&o.negate(),a=o.add(new R(0,.12,0));break}default:a=new R(n.x,0,n.z).normalize().applyAxisAngle(Aa,1).add(new R(0,.38,0))}return{off:a.normalize().multiplyScalar(e),dist:e}}orbitOffset(){const t=this.camera.aspect<.9?1.45:1;return new R(0,92*t,118*t)}setControlLimits(t){const e=this.controls;e.minPolarAngle=.02,e.maxPolarAngle=Math.PI-.02,e.rotateSpeed=.7,e.enableZoom=!0,e.zoomSpeed=.8,t==="earth"?(e.minDistance=1.5,e.maxDistance=16):t==="orbit"?(e.minDistance=20,e.maxDistance=420):this.groundMode==="sphere"?(e.minDistance=14,e.maxDistance=70,e.maxPolarAngle=1.48):(e.enableZoom=!1,e.minDistance=e.maxDistance=.02,e.minPolarAngle=Math.PI/2-.5,e.maxPolarAngle=Math.PI-.01,e.rotateSpeed=-.4)}onViewChange(t){const e=this.view;if(this.flash(),e==="ground"||t==="ground"){this.tween=null,this.snapToView(!1);return}this.controls.autoRotate=!1;const n=this.camera.position.clone(),s=this.controls.target.clone();this.controls.minDistance=.5,this.controls.maxDistance=600;const r=e==="earth"?this.earthOffset("default").off:this.orbitOffset();this.tween={t:0,dur:1.3,fromPos:n,fromTarget:s,toOffset:r,toTargetOffset:new R,view:e}}flash(){const t=this.renderer.domElement;t.classList.remove("scene-fade"),t.offsetWidth,t.classList.add("scene-fade")}snapToView(t){const e=this.view;if(this.updateFrame(0),this.scene.fog=null,this.camera.fov=45,this.camera.near=.05,this.camera.far=6e3,this.camera.updateProjectionMatrix(),this.controls.autoRotate=t&&!st.state.introDone,e==="ground")this.sky.setMode(this.groundMode),this.setControlLimits("ground"),this.groundMode==="sphere"?(this.camera.position.set(0,13,27),this.controls.target.set(0,3.5,0)):(this.camera.near=.1,this.camera.fov=72,this.camera.updateProjectionMatrix(),this.controls.target.set(0,1.6,0),this.lookAt(0,14));else{if(this.setControlLimits(e),this.anchor(this.lastAnchor),e==="earth"){const{off:n}=this.earthOffset("default");this.camera.position.copy(this.earthPos).add(n),this.controls.target.copy(this.earthPos)}else this.camera.position.copy(this.orbitOffset()),this.controls.target.set(0,0,0);this.earthScale=e==="orbit"?wa:1}this.controls.update()}setFocus(t){if(this.view==="earth"){this.updateFrame(0);const{off:e}=this.earthOffset(t);this.startTween(e,new R,"earth")}else this.view==="orbit"&&this.startTween(this.orbitOffset(),new R,"orbit")}startTween(t,e,n,s=1){this.controls.autoRotate=!1,this.controls.minDistance=.5,this.controls.maxDistance=600,this.tween={t:0,dur:s,fromPos:this.camera.position.clone(),fromTarget:this.controls.target.clone(),toOffset:t,toTargetOffset:e,view:n}}lookAt(t,e){if(this.view!=="ground"||this.groundMode!=="immersive")return;const n=Ge(e,t,1);this.camera.position.copy(this.controls.target).addScaledVector(n,-.02),this.controls.update()}lookAtSun(){this.lookAt(this.sky.sunAz,Math.max(8,Math.min(60,this.sky.sunAlt)))}pick(t){if(this.view==="ground")return;const e=this.renderer.domElement.getBoundingClientRect(),n=new Et((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),s=new u0;s.setFromCamera(n,this.camera);const r=s.intersectObject(this.earth.pickMesh,!1)[0];if(!r)return;const{lat:a,lon:o}=this.earth.worldPointToLatLon(r.point);Ih(Math.round(a*100)/100,Math.round(o*100)/100)}updateFrame(t){const e=st.state,n=ie(e.time);this.sun=n,ki(n.earthLon,e.layers.exaggerate,this.earthPos),this.sunDir.copy(this.earthPos).negate().normalize();const s=this.view==="orbit"?wa:1;this.earthScale+=(s-this.earthScale)*Math.min(1,t*4),Math.abs(this.earthScale-s)<.001&&(this.earthScale=s),this.earth.root.position.copy(this.earthPos),this.earth.root.scale.setScalar(this.earthScale),this.earth.update(n,e,this.sunDir,e.time),this.earth.root.updateMatrixWorld(!0);const r=(this.earthScale-1)/(wa-1);this.orbit.setSunScale(.4+.6*r),this.orbit.update(n,e,this.earthPos,this.view),this.spaceStarsRoot.rotation.x=-n.eps*Tt,this.spaceStarsRoot.position.copy(this.camera.position);const a=this.view==="ground";this.earth.root.visible=!a,this.orbit.root.visible=!a,this.sky.root.visible=a,a?(this.sky.update(n,e,this.camera.position),this.groundMode==="immersive"?(this.scene.fog||(this.scene.fog=new oo(0,120,1600)),this.scene.fog.color.copy(this.sky.fogColor),this.renderer.setClearColor(this.sky.fogColor)):(this.scene.fog=null,this.renderer.setClearColor(132106))):(this.scene.fog=null,this.renderer.setClearColor(132106)),this.applyVisibility(e)}applyVisibility(t){const e=new Map,n=(a,o)=>{for(const[l,c]of Object.entries(a)){const h=l,d=t.layers[h]&&(o?this.view===o:Eh[h].includes(this.view));for(const f of c??[])e.set(f,(e.get(f)??!1)||d)}};n(this.earth.layerGroups),n(this.orbit.layerGroups,"orbit"),n(this.sky.layerGroups);for(const[a,o]of e)a.visible=o;this.spaceStars.group.visible=t.layers.stars&&this.view!=="ground";const s=t.layers.labels,r=s&&this.view==="earth";for(const a of this.earth.labels)Ra(a,r);for(const a of this.orbit.allLabels())Ra(a,s&&this.view!=="ground");for(const a of this.sky.allLabels())Ra(a,s)}update(t){if(t=Math.min(t,.1),this.updateFrame(t),this.view!=="ground")if(this.tween){const e=this.tween;e.t+=t;const n=k0(Math.min(1,e.t/e.dur)),s=this.anchor(),r=s.clone().add(e.toOffset),a=s.clone().add(e.toTargetOffset);this.camera.position.lerpVectors(e.fromPos,r,n),this.controls.target.lerpVectors(e.fromTarget,a,n),e.t>=e.dur&&(this.tween=null,this.setControlLimits(this.view)),this.lastAnchor.copy(s)}else{const e=this.anchor(),n=e.clone().sub(this.lastAnchor);n.lengthSq()>0&&(this.camera.position.add(n),this.controls.target.add(n)),this.lastAnchor.copy(e)}this.updateViewShift(t),this.controls.update(),this.spaceStarsRoot.position.copy(this.camera.position),this.renderer.render(this.scene,this.camera)}get currentQuality(){return this.quality}}function Ra(i,t){i.visible=t}function B(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))r==null||r===!1||(s==="class"?n.className=String(r):s==="text"?n.textContent=String(r):s==="html"?n.innerHTML=String(r):s.startsWith("on")&&typeof r=="function"?n.addEventListener(s.slice(2).toLowerCase(),r):s==="dataset"?Object.assign(n.dataset,r):n.setAttribute(s,r===!0?"":String(r)));for(const s of e)s==null||s===!1||n.append(s instanceof Node?s:document.createTextNode(s));return n}function H0(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function ii(i,t){i.textContent!==t&&(i.textContent=t)}function Ca(i,t,e,n){const s=B("input",{type:"checkbox",class:"sw-input"});return s.checked=t,s.addEventListener("change",()=>e(s.checked)),{root:B("label",{class:"sw",title:n??""},s,B("span",{class:"sw-track"},B("span",{class:"sw-thumb"})),B("span",{class:"sw-label",text:i})),input:s}}function V0(i){const t=B("button",{class:"lesson-toggle",title:"展开/收起课程","aria-label":"展开或收起课程卡片"},B("span",{class:"lt-icon"})),e=B("div",{class:"lesson-body"});i.append(t,e),t.addEventListener("click",()=>st.set({lessonOpen:!st.state.lessonOpen}));let n="";const s=()=>{const{chapter:c,step:h}=st.state,d=`${c}|${h}`;if(d===n)return;n=d;const f=mn[c],m=f.steps[h];H0(e),e.scrollTop=0,e.append(B("div",{class:"lesson-head"},B("span",{class:"lesson-num",text:f.num}),B("div",{},B("div",{class:"lesson-chapter",text:f.title}),B("div",{class:"lesson-summary",text:f.summary}))),B("div",{class:"lesson-kicker",text:m.kicker}),B("h2",{class:"lesson-title",text:m.title}));const g=B("div",{class:"lesson-text"});for(const _ of m.body)g.append(B("p",{text:_}));if(e.append(g),m.points.length){const _=B("ul",{class:"lesson-points"});for(const p of m.points)_.append(B("li",{text:p}));e.append(_)}m.question&&e.append(B("div",{class:"lesson-question"},B("b",{text:Ut.lesson.think+" · "}),m.question)),m.actions?.length&&e.append(r(m)),f.tasks&&e.append(a(f.tasks)),e.append(o(c,h,f.steps.length))},r=c=>{const h=B("div",{class:"lesson-actions"},B("span",{class:"la-label",text:Ut.lesson.try+"："}));for(const d of c.actions??[]){const m=!!d.setup.city&&st.state.city===d.setup.city;h.append(B("button",{class:"chip"+(m?" on":""),text:d.label,onclick:()=>{Na(d.setup),h.querySelectorAll(".chip").forEach(g=>{const _=g,p=(c.actions??[]).find(u=>u.label===_.textContent)?.setup.city;_.classList.toggle("on",!!p&&st.state.city===p)})}}))}return h},a=c=>{const h=B("div",{class:"tasks"});return c.forEach((d,f)=>{const m=B("div",{class:"task-hint hidden",text:"提示："+d.hint}),g=B("div",{class:"task-answer hidden",text:"参考答案："+d.answer}),_=B("button",{class:"chip ghost",text:Ut.explore.hint,onclick:()=>m.classList.toggle("hidden")}),p=B("button",{class:"chip ghost",text:Ut.explore.answer,onclick:()=>{g.classList.toggle("hidden"),p.textContent=g.classList.contains("hidden")?Ut.explore.answer:Ut.explore.hide}});h.append(B("div",{class:"task"},B("div",{class:"task-title"},B("span",{class:"task-idx",text:String(f+1)}),d.title.replace(/^任务[一二三四五六]：/,"")),B("div",{class:"task-goal",text:d.goal}),B("div",{class:"task-btns"},B("button",{class:"chip primary",text:Ut.explore.setScene,onclick:()=>Na(d.setup)}),_,p),m,g))}),h},o=(c,h,d)=>{const f=B("div",{class:"dots"});for(let _=0;_<d;_++)f.append(B("button",{class:"dot"+(_===h?" on":""),title:mn[c].steps[_].title,onclick:()=>ci(c,_)}));const m=c===0&&h===0,g=c===mn.length-1&&h===d-1;return B("div",{class:"lesson-nav"},B("button",{class:"btn-nav",text:"← "+Ut.lesson.prev,disabled:m,onclick:Sc}),f,B("button",{class:"btn-nav primary",text:Ut.lesson.next+" →",disabled:g,onclick:yc}))},l=()=>{i.classList.toggle("collapsed",!st.state.lessonOpen)};st.subscribe(c=>{(c.has("chapter")||c.has("step"))&&s(),c.has("lessonOpen")&&l()}),s(),l()}const Mt={text:"#9fb0cc",dim:"rgba(159,176,204,0.55)",grid:"rgba(255,255,255,0.07)",gold:"#e0b64a",teal:"#22d3ee",coral:"#ff7a59",blue:"#5aa9ff",white:"#f4f7ff"},pn='11px "DM Sans","Noto Serif SC","PingFang SC","Microsoft YaHei",sans-serif',uc=new Map;function Ds(i){const t=uc.get(i);if(t)return t;const e=vc(i),n={year:i,n:e,dec:[],eot:[],distMkm:[],v:[]};for(let s=0;s<=e;s++){const r=ie(Date.UTC(i,0,1+s,4));n.dec.push(r.dec),n.eot.push(r.eot),n.distMkm.push(r.distKm/1e6),n.v.push(r.v)}return uc.set(i,n),n}class fi{constructor(t,e,n,s,r,a,o,l){this.g=t,this.W=e,this.H=n,this.x0=s,this.x1=r,this.y0=a,this.y1=o,Object.assign(this,l)}l=40;r=12;t=18;b=26;X(t){return this.l+(t-this.x0)/(this.x1-this.x0)*(this.W-this.l-this.r)}Y(t){return this.H-this.b-(t-this.y0)/(this.y1-this.y0)*(this.H-this.t-this.b)}grid(t,e,n={}){const s=this.g;s.font=pn,s.lineWidth=1,s.textBaseline="middle",s.textAlign="right";for(const r of e){const a=Math.round(this.Y(r.v))+.5;s.strokeStyle=Mt.grid,s.beginPath(),s.moveTo(this.l,a),s.lineTo(this.W-this.r,a),s.stroke(),s.fillStyle=Mt.text,s.fillText(r.label,this.l-6,a)}s.textAlign="center",s.textBaseline="top";for(const r of t){const a=Math.round(this.X(r.v))+.5;s.strokeStyle=Mt.grid,s.beginPath(),s.moveTo(a,this.t),s.lineTo(a,this.H-this.b),s.stroke(),s.fillStyle=Mt.text,s.fillText(r.label,a,this.H-this.b+5)}s.strokeStyle="rgba(255,255,255,0.25)",s.strokeRect(this.l+.5,this.t+.5,this.W-this.l-this.r,this.H-this.t-this.b),n.yTitle&&(s.save(),s.translate(10,this.t+(this.H-this.t-this.b)/2),s.rotate(-Math.PI/2),s.textAlign="center",s.textBaseline="middle",s.fillStyle=Mt.dim,s.fillText(n.yTitle,0,0),s.restore()),n.xTitle&&(s.textAlign="right",s.textBaseline="bottom",s.fillStyle=Mt.dim,s.fillText(n.xTitle,this.W-this.r,this.H-1))}path(t,e,n=2,s=[]){const r=this.g;r.save(),r.beginPath(),r.rect(this.l,this.t,this.W-this.l-this.r,this.H-this.t-this.b),r.clip(),r.beginPath(),t.forEach(([a,o],l)=>l?r.lineTo(this.X(a),this.Y(o)):r.moveTo(this.X(a),this.Y(o))),r.strokeStyle=e,r.lineWidth=n,r.setLineDash(s),r.lineJoin="round",r.stroke(),r.restore()}vline(t,e,n=[4,4],s,r=Mt.text){const a=this.g;a.save(),a.strokeStyle=e,a.lineWidth=1,a.setLineDash(n),a.beginPath(),a.moveTo(this.X(t),this.t),a.lineTo(this.X(t),this.H-this.b),a.stroke(),a.restore(),s&&(a.font=pn,a.fillStyle=r,a.textAlign="center",a.textBaseline="top",a.fillText(s,this.X(t),this.t+2))}hline(t,e,n=[4,4],s,r=Mt.text){const a=this.g;a.save(),a.strokeStyle=e,a.lineWidth=1,a.setLineDash(n),a.beginPath(),a.moveTo(this.l,this.Y(t)),a.lineTo(this.W-this.r,this.Y(t)),a.stroke(),a.restore(),s&&(a.font=pn,a.fillStyle=r,a.textAlign="left",a.textBaseline="bottom",a.fillText(s,this.l+4,this.Y(t)-2))}dot(t,e,n,s=4.5){const r=this.g;r.beginPath(),r.arc(this.X(t),this.Y(e),s,0,Math.PI*2),r.fillStyle=n,r.fill(),r.strokeStyle="#05070f",r.lineWidth=1.5,r.stroke()}text(t,e,n,s=Mt.white,r="left"){const a=this.g;a.font=pn,a.fillStyle=s,a.textAlign=r,a.textBaseline="top",a.fillText(t,e,n)}}function Us(i){return Array.from({length:12},(t,e)=>({v:(Date.UTC(i,e,1)-Date.UTC(i,0,1))/We,label:String(e+1)}))}function Cn(i,t=String){return i.map(e=>({v:e,label:t(e)}))}function fo(i){return i.refraction?-.833:-.267}function oh(i,t,e,n=!0){const s=ts(e),r=li(e,t.tz),a=[[s.marEquinox,"春分"],[s.junSolstice,"夏至"],[s.sepEquinox,"秋分"],[s.decSolstice,"冬至"]];for(const[o,l]of a)i.vline((o-r)/We,"rgba(255,255,255,0.22)",[3,4],n?l:void 0,Mt.dim)}function is(i){const t=He(i.ms,i.tz).year;return{x:Cr(i.ms,i.tz),year:t}}const W0=(i,t,e,n)=>{const{x:s,year:r}=is(n),a=Ds(r),o=new fi(i,t,e,0,a.n,-27,27);o.grid(Us(r),Cn([-23.44,0,23.44],c=>`${c}°`),{xTitle:"月份",yTitle:"直射点纬度"}),o.hline(cn,"rgba(255,179,71,0.5)",[3,3],"北回归线"),o.hline(-cn,"rgba(255,179,71,0.5)",[3,3]),o.hline(0,"rgba(255,107,107,0.5)",[3,3],"赤道"),oh(o,n,r),o.path(a.dec.map((c,h)=>[h,c]),Mt.gold,2.2);const l=ie(n.ms).dec;o.vline(s,"rgba(34,211,238,0.5)",[2,3]),o.dot(s,l,Mt.teal),o.text(`此刻直射点：${Math.abs(l).toFixed(2)}°${l>=0?"N":"S"}`,o.l+6,o.Y(-17),Mt.white)},X0=(i,t,e,n)=>{const s=ie(n.ms),r=s.dec*Tt,a=Math.min(t*.3,e*.36),o=t*.55,l=e*.5;i.strokeStyle="rgba(255,214,102,0.5)",i.fillStyle="rgba(255,214,102,0.8)",i.lineWidth=1.2;for(let u=-3;u<=3;u++){const M=l+u*(a/3);i.beginPath(),i.moveTo(8,M),i.lineTo(o-Math.sqrt(Math.max(0,a*a-(u*a/3)**2))-3,M),i.stroke();const v=o-Math.sqrt(Math.max(0,a*a-(u*a/3)**2))-3;i.beginPath(),i.moveTo(v,M),i.lineTo(v-7,M-3.5),i.lineTo(v-7,M+3.5),i.fill()}i.font=pn,i.fillStyle="#ffd666",i.textAlign="left",i.textBaseline="top",i.fillText("太阳光",8,6),i.beginPath(),i.arc(o,l,a,0,Math.PI*2),i.fillStyle="#0b1530",i.fill(),i.beginPath(),i.arc(o,l,a,Math.PI/2,Math.PI*3/2),i.closePath(),i.fillStyle="#2c5fb3",i.fill(),i.beginPath(),i.arc(o,l,a,0,Math.PI*2),i.strokeStyle="rgba(255,255,255,0.45)",i.stroke(),i.beginPath(),i.moveTo(o,l-a-8),i.lineTo(o,l+a+8),i.setLineDash([5,4]),i.strokeStyle="#ffb347",i.lineWidth=1.5,i.stroke(),i.setLineDash([]),i.fillStyle="#ffb347",i.textAlign="center",i.fillText("晨昏线",o,l-a-22),i.fillStyle=Mt.dim,i.fillText("昼",o-a*.5,l+a+8),i.fillText("夜",o+a*.5,l+a+8);const c=-Math.sin(r),h=Math.cos(r),d=Math.cos(r),f=Math.sin(r),m=(u,M)=>{const v=u*Tt,x=a*Math.sin(v),L=a*Math.cos(v)*M;return[o+c*x+d*L,l-(h*x+f*L)]},g=(u,M,v,x=!1)=>{const L=m(u,-1),T=m(u,1),A=40;for(let S=0;S<A;S++){const w=m(u,-1+2*S/A),W=m(u,-1+2*(S+1)/A);i.beginPath(),i.moveTo(w[0],w[1]),i.lineTo(W[0],W[1]);const I=(w[0]+W[0])/2<o;i.strokeStyle=I?M:"rgba(120,140,180,0.65)",i.lineWidth=x?3:1.6,i.stroke()}i.fillStyle=M,i.font=pn,i.textAlign=T[0]>=L[0]?"left":"right",i.textBaseline="middle";const z=T[0]>=L[0]?T:L;i.fillText(v,z[0]+(z[0]>=o?5:-5),z[1])};g(0,"#ff8a8a","赤道"),g(cn,"#ffc27a","北回归线"),g(-cn,"#ffc27a","南回归线"),g(90-cn,"#8fd8ff","北极圈"),g(-66.56071,"#8fd8ff","南极圈");const _=fo(n),p=Hn(n.lat,s.dec,_)/7.5;g(n.lat,Mt.teal,`观测纬度 昼${p.toFixed(1)}h`,!0),i.beginPath(),i.moveTo(o-c*a*1.25,l+h*a*1.25),i.lineTo(o+c*a*1.25,l-h*a*1.25),i.strokeStyle="#ffd27a",i.lineWidth=2,i.stroke(),i.fillStyle="#ffb199",i.textAlign="center",i.fillText("N",o+c*a*1.38,l-h*a*1.38),i.fillStyle="#a9c8ff",i.fillText("S",o-c*a*1.38,l+h*a*1.38),i.fillStyle=Mt.text,i.textAlign="left",i.textBaseline="top",i.fillText(`直射点纬度 ${Math.abs(s.dec).toFixed(1)}°${s.dec>=0?"N":"S"}`,8,e-18)},q0=(i,t,e,n)=>{const{x:s,year:r}=is(n),a=Ds(r),o=fo(n),l=new fi(i,t,e,0,a.n,0,24);l.grid(Us(r),Cn([0,6,12,18,24],m=>`${m}h`),{xTitle:"月份",yTitle:"昼长"}),oh(l,n,r),l.hline(12,"rgba(255,255,255,0.3)",[4,4],"12 小时");const c=a.dec.map((m,g)=>[g,Hn(n.lat,m,o)/7.5]);l.path(c,Mt.gold,2.4);const h=Hn(n.lat,ie(n.ms).dec,o)/7.5;l.vline(s,"rgba(34,211,238,0.5)",[2,3]),l.dot(s,h,Mt.teal);const d=Math.max(...c.map(m=>m[1])),f=Math.min(...c.map(m=>m[1]));l.text(`纬度 ${Math.abs(n.lat).toFixed(1)}°${n.lat>=0?"N":"S"}　此刻昼长 ${gs(h)}`,l.l+6,l.t+18,Mt.white),l.text(`全年最长 ${gs(d)}　最短 ${gs(f)}`,l.l+6,l.t+34,Mt.dim)};let dc="",zi=null;const Bi=[[0,[6,10,30]],[.25,[28,48,110]],[.5,[64,128,168]],[.75,[222,184,92]],[1,[255,245,176]]];function fc(i){i=Math.max(0,Math.min(1,i));for(let t=1;t<Bi.length;t++)if(i<=Bi[t][0]){const[e,n]=Bi[t-1],[s,r]=Bi[t],a=(i-e)/(s-e);return[n[0]+(r[0]-n[0])*a,n[1]+(r[1]-n[1])*a,n[2]+(r[2]-n[2])*a]}return Bi[Bi.length-1][1]}const Y0=(i,t,e,n)=>{const{x:s,year:r}=is(n),a=Ds(r),o=fo(n),l=`${r}|${o}`;if(l!==dc||!zi){dc=l,zi=document.createElement("canvas"),zi.width=a.n,zi.height=181;const m=zi.getContext("2d"),g=m.createImageData(a.n,181);for(let _=0;_<181;_++){const p=90-_;for(let u=0;u<a.n;u++){const M=Hn(p,a.dec[u],o)/7.5,[v,x,L]=fc(M/24),T=(_*a.n+u)*4;g.data[T]=v,g.data[T+1]=x,g.data[T+2]=L,g.data[T+3]=255}}m.putImageData(g,0,0)}const c=new fi(i,t,e,0,a.n,-90,90,{r:30});i.imageSmoothingEnabled=!0,i.drawImage(zi,c.l,c.t,t-c.l-c.r,e-c.t-c.b),c.grid(Us(r),Cn([-90,-66.56,-23.44,0,23.44,66.56,90],m=>`${Math.round(m)}°`),{xTitle:"月份",yTitle:"纬度"});for(const m of[cn,-cn,90-cn,-66.56071])c.hline(m,"rgba(255,255,255,0.35)",[3,4]);c.hline(0,"rgba(255,255,255,0.5)",[3,4]);const h=t-22,d=e-c.t-c.b;for(let m=0;m<d;m++){const[g,_,p]=fc(1-m/d);i.fillStyle=`rgb(${g|0},${_|0},${p|0})`,i.fillRect(h,c.t+m,8,1.5)}i.font=pn,i.fillStyle=Mt.text,i.textAlign="left",i.textBaseline="top",i.fillText("24h",h-4,c.t-14),i.textBaseline="bottom",i.fillText("0h",h,e-c.b+14),i.strokeStyle=Mt.teal,i.lineWidth=1,i.setLineDash([3,3]),i.beginPath(),i.moveTo(c.X(s),c.t),i.lineTo(c.X(s),e-c.b),i.moveTo(c.l,c.Y(n.lat)),i.lineTo(t-c.r,c.Y(n.lat)),i.stroke(),i.setLineDash([]),c.dot(s,n.lat,Mt.teal);const f=Hn(n.lat,ie(n.ms).dec,o)/7.5;c.text(`此刻昼长 ${gs(f)}`,c.l+6,c.t+4,"#ffffff")},$0=(i,t,e,n)=>{const{year:s}=is(n),r=ts(s),a=new fi(i,t,e,-90,90,-30,90);a.grid(Cn([-90,-60,-30,0,30,60,90],m=>`${m}°`),Cn([0,30,60,90],m=>`${m}°`),{xTitle:"纬度",yTitle:"正午太阳高度"}),a.hline(0,"rgba(255,255,255,0.4)",[4,4],"地平线");const o=[[ie(r.junSolstice).dec,"夏至","#ff9b78"],[ie(r.marEquinox).dec,"春/秋分","#ffffff"],[ie(r.decSolstice).dec,"冬至","#7dbcff"]];o.forEach(([m,,g])=>{const _=[];for(let p=-90;p<=90;p+=1)_.push([p,pr(p,m)]);a.path(_,g,1.4,[5,4])});const l=ie(n.ms).dec,c=[];for(let m=-90;m<=90;m+=1)c.push([m,pr(m,l)]);a.path(c,Mt.gold,2.6);const h=pr(n.lat,l);a.vline(n.lat,"rgba(34,211,238,0.5)",[2,3]),a.dot(n.lat,h,Mt.teal),a.text(`纬度 ${Math.abs(n.lat).toFixed(1)}°${n.lat>=0?"N":"S"}　正午太阳高度 ${h.toFixed(1)}°`,a.l+6,a.t+4,Mt.white);let d=a.l+6;const f=a.t+20;for(const[,m,g]of[...o,[0,"当前",Mt.gold]])i.fillStyle=g,i.fillRect(d,f+3,12,3),a.text(m,d+16,f-1,Mt.text),d+=16+i.measureText(m).width+12},j0=(i,t,e,n)=>{const{x:s,year:r}=is(n),a=Ds(r),o=new fi(i,t,e,0,a.n,146.5,153.5,{r:40}),l=m=>146.5+(m-29.1)/(30.5-29.1)*7;o.grid(Us(r),Cn([147,149,151,153],m=>`${m}`),{xTitle:"月份",yTitle:"日地距离（百万 km）"});const c=i;c.font=pn,c.fillStyle=Mt.teal,c.textAlign="left",c.textBaseline="middle";for(const m of[29.2,29.6,30,30.4])c.fillText(m.toFixed(1),t-o.r+4,o.Y(l(m)));const h=ts(r),d=li(r,n.tz);o.vline((h.perihelion-d)/We,"rgba(255,122,89,0.5)",[3,3],"近日点","#ff9a80"),o.vline((h.aphelion-d)/We,"rgba(90,169,255,0.5)",[3,3],"远日点","#8fc3ff"),o.path(a.distMkm.map((m,g)=>[g,m]),Mt.gold,2.2),o.path(a.v.map((m,g)=>[g,l(m)]),Mt.teal,2.2);const f=ie(n.ms);o.vline(s,"rgba(255,255,255,0.35)",[2,3]),o.dot(s,f.distKm/1e6,Mt.gold),o.dot(s,l(f.v),Mt.teal),o.text(`距离 ${(f.distKm/1e6).toFixed(2)} 百万km（${f.R.toFixed(4)} AU）`,o.l+6,o.t+18,Mt.gold),o.text(`速度 ${f.v.toFixed(2)} km/s`,o.l+6,o.t+34,Mt.teal)},K0=(i,t,e,n)=>{const r=ie(n.ms),a=Math.min(t*.42,(e-56)/(2*Math.sqrt(1-.55*.55))),o=a*Math.sqrt(1-.55*.55),l=t/2,c=e/2+4,h=l+a*.55,d=M=>{const v=Sh(M,.55).E;return[l+a*Math.cos(v),c-o*Math.sin(v)]},f=12,m=(r.M%360+360)%360;for(let M=0;M<f;M++){const v=M/f*Math.PI*2,x=(M+1)/f*Math.PI*2;i.beginPath(),i.moveTo(h,c);for(let T=0;T<=12;T++){const[A,z]=d(v+(x-v)*T/12);i.lineTo(A,z)}i.closePath();const L=205+M%2*25;i.fillStyle=`hsla(${L},55%,${M%2?38:30}%,0.55)`,i.fill(),i.strokeStyle="rgba(255,255,255,0.25)",i.lineWidth=1,i.stroke()}const g=m*Tt,_=g-Math.PI*2/f;i.beginPath(),i.moveTo(h,c);for(let M=0;M<=16;M++){const[v,x]=d(_+(g-_)*M/16);i.lineTo(v,x)}i.closePath(),i.fillStyle="rgba(255,200,70,0.55)",i.fill(),i.strokeStyle="#ffd666",i.lineWidth=1.5,i.stroke(),i.beginPath();for(let M=0;M<=120;M++){const[v,x]=d(M/120*Math.PI*2);M?i.lineTo(v,x):i.moveTo(v,x)}i.strokeStyle="#7fb0ff",i.lineWidth=1.6,i.stroke(),i.beginPath(),i.arc(h,c,7,0,Math.PI*2),i.fillStyle="#ffd45c",i.fill();const[p,u]=d(g);i.beginPath(),i.arc(p,u,5,0,Math.PI*2),i.fillStyle="#4aa3ff",i.fill(),i.strokeStyle="#fff",i.lineWidth=1.2,i.stroke(),i.font=pn,i.fillStyle=Mt.white,i.textAlign="center",i.textBaseline="top",i.fillText("太阳",h,c+10),i.fillText("地球",p,u+8),i.fillStyle="#ff9a80",i.fillText("近日点（快）",l+a-22,c-22),i.fillStyle="#8fc3ff",i.fillText("远日点（慢）",l-a+26,c-22),i.textAlign="left",i.fillStyle=Mt.text,i.fillText("12 个扇形对应相等的时间（各约 30.4 天），面积相等",8,6),i.fillStyle="#ffd666",i.fillText(`金色：最近 30 天扫过的面积　当前速度 ${r.v.toFixed(2)} km/s`,8,e-18)},Z0=(i,t,e,n)=>{ie(n.ms);const s=Math.min(t*.62,260),r=t*.14,a=e*.52,o=30*Tt,l=r+s,c=a,h=r+s*Math.cos(o),d=a-s*Math.sin(o);i.beginPath(),i.arc(r,a,s,-Math.PI/4,Math.PI/6),i.strokeStyle="rgba(127,176,255,0.6)",i.lineWidth=1.5,i.setLineDash([4,4]),i.stroke(),i.setLineDash([]),i.beginPath(),i.arc(r,a,16,0,Math.PI*2),i.fillStyle="#ffd45c",i.fill(),i.font=pn,i.fillStyle=Mt.white,i.textAlign="center",i.textBaseline="top",i.fillText("太阳",r,a+20);const f=17,m=(M,v)=>{i.beginPath(),i.arc(M,v,f,0,Math.PI*2),i.fillStyle="#245aa8",i.fill(),i.beginPath(),i.arc(M,v,f,Math.PI/2+0,Math.PI*3/2+0),i.closePath(),i.strokeStyle="rgba(255,255,255,0.7)",i.lineWidth=1.2,i.stroke()},g=(M,v,x,L,T,A=2)=>{const z=M+Math.cos(x)*L,S=v-Math.sin(x)*L;i.beginPath(),i.moveTo(M,v),i.lineTo(z,S),i.strokeStyle=T,i.lineWidth=A,i.stroke(),i.beginPath(),i.moveTo(z,S),i.lineTo(z-Math.cos(x-.4)*8,S+Math.sin(x-.4)*8),i.lineTo(z-Math.cos(x+.4)*8,S+Math.sin(x+.4)*8),i.closePath(),i.fillStyle=T,i.fill()};i.setLineDash([2,5]),i.strokeStyle="rgba(255,255,255,0.35)",i.lineWidth=1;for(const[M,v]of[[l,c],[h,d]])i.beginPath(),i.moveTo(M,v),i.lineTo(t-6,v),i.stroke();i.setLineDash([]),i.fillStyle=Mt.dim,i.textAlign="right",i.fillText("遥远恒星方向 →",t-8,c+6),m(l,c),g(l,c,Math.PI,44,Mt.gold),i.fillStyle=Mt.text,i.textAlign="center",i.fillText("第 0 天 正午",l,c+f+6),m(h,d);const _=Math.PI+o;g(h,d,Math.PI,44,"#9fb0cc",1.8),g(h,d,_,44,Mt.gold),i.fillStyle=Mt.text,i.fillText("1 天后",h,d-f-18),i.beginPath(),i.arc(h,d,30,-Math.PI-0+0,-_,!0),i.strokeStyle=Mt.coral,i.lineWidth=1.5,i.stroke(),i.fillStyle=Mt.coral,i.textAlign="right",i.fillText("≈0.9856°（图中夸大）",h-48,d+22),i.fillStyle="#9fb0cc",i.textAlign="left",i.fillText("灰：恒星日 转 360°",h+24,d-4),i.fillStyle=Mt.gold,i.fillText("金：太阳日 转 360.9856°",h+24,d+12),i.textAlign="left",i.fillStyle=Mt.white,i.fillText(`恒星日 ${Hr(fr)}　太阳日 ${Hr(Br)}　相差 ${Hr(Br-fr)}`,8,6);const p=He(n.ms,n.tz).year,u=Cr(n.ms,n.tz);i.fillStyle=Mt.text,i.fillText(`${p}年已过 ${u.toFixed(1)} 天，地球已自转 ${(u*Br/fr).toFixed(2)} 圈（= 太阳日数 + ${(u/365.2422).toFixed(2)}）`,8,e-18)},J0=(i,t,e,n)=>{const s=new fi(i,t,e,-90,90,0,1800);s.grid(Cn([-90,-60,-30,0,30,60,90],o=>`${o}°`),Cn([0,600,1200,1800],o=>`${o}`),{xTitle:"纬度",yTitle:"线速度（km/h）"});const r=[];for(let o=-90;o<=90;o+=1)r.push([o,Gi(o)]);s.path(r,Mt.gold,2.4);for(const o of _r)s.dot(o.lat,Gi(o.lat),"rgba(255,255,255,0.45)",2.2);const a=Gi(n.lat);s.vline(n.lat,"rgba(34,211,238,0.5)",[2,3]),s.dot(n.lat,a,Mt.teal),s.text(`纬度 ${Math.abs(n.lat).toFixed(1)}°${n.lat>=0?"N":"S"}　${Math.round(a).toLocaleString("zh-CN")} km/h（${(a/3.6).toFixed(0)} m/s）`,s.l+6,s.t+4,Mt.white),s.text(`赤道 ${Math.round(Gi(0))} km/h　两极 0　白点为各城市`,s.l+6,s.t+20,Mt.dim)},Q0=(i,t,e,n)=>{const{x:s,year:r}=is(n),a=Ds(r),o=new fi(i,t,e,0,a.n,-20,20);o.grid(Us(r),Cn([-15,-10,-5,0,5,10,15],f=>`${f>0?"+":""}${f}`),{xTitle:"月份",yTitle:"均时差（分钟）"}),i.save(),i.beginPath(),i.rect(o.l,o.t,t-o.l-o.r,e-o.t-o.b),i.clip(),i.beginPath(),a.eot.forEach((f,m)=>m?i.lineTo(o.X(m),o.Y(f)):i.moveTo(o.X(m),o.Y(f))),i.lineTo(o.X(a.n),o.Y(0)),i.lineTo(o.X(0),o.Y(0)),i.closePath(),i.fillStyle="rgba(224,182,74,0.15)",i.fill(),i.restore(),o.hline(0,"rgba(255,255,255,0.4)",[]),o.path(a.eot.map((f,m)=>[m,f]),Mt.gold,2.2);let l=0,c=0;a.eot.forEach((f,m)=>{f>a.eot[l]&&(l=m),f<a.eot[c]&&(c=m)});const h=li(r,n.tz);o.dot(l,a.eot[l],Mt.coral,3),o.dot(c,a.eot[c],Mt.blue,3),o.text(`最大 +${a.eot[l].toFixed(1)}′ (${xr(h+l*We,n.tz)})`,o.X(l)-4,o.Y(a.eot[l])-16,"#ff9a80","right"),o.text(`最小 ${a.eot[c].toFixed(1)}′ (${xr(h+c*We,n.tz)})`,o.X(c)+4,o.Y(a.eot[c])+6,"#8fc3ff","left");const d=ie(n.ms).eot;o.vline(s,"rgba(34,211,238,0.5)",[2,3]),o.dot(s,d,Mt.teal),o.text(`此刻均时差 ${d>=0?"+":""}${d.toFixed(1)} 分钟（真太阳时${d>=0?"快于":"慢于"}平太阳时）`,o.l+6,o.t+4,Mt.white)},t_={declination:W0,sideView:X0,dayLength:q0,heatmap:Y0,noonAlt:$0,distance:j0,kepler:K0,sidereal:Z0,linearSpeed:J0,eot:Q0};function e_(i,t,e){const n=Math.min(window.devicePixelRatio||1,2),s=i.clientWidth,r=i.clientHeight;if(s<10||r<10)return;(i.width!==Math.round(s*n)||i.height!==Math.round(r*n))&&(i.width=Math.round(s*n),i.height=Math.round(r*n));const a=i.getContext("2d");a.setTransform(n,0,0,n,0,0),a.clearRect(0,0,s,r),a.setLineDash([]),t_[t](a,s,r,e)}function La(i,t){return t.map(([e,n])=>{const s=B("span",{class:"stat-val",text:"--"});return i.append(B("div",{class:"stat",title:n??""},B("span",{class:"stat-label",text:e}),s)),{set:r=>ii(s,r)}})}function bn(i,...t){const e=B("section",{class:"dock-sec"},B("h3",{class:"dock-h",text:i}));for(const n of t)n&&e.append(n);return e}function n_(i){const t=B("div",{class:"dock-tabs"}),e={data:B("div",{class:"pane pane-data"}),layers:B("div",{class:"pane pane-layers"}),settings:B("div",{class:"pane pane-settings"})},n={};["data","layers","settings"].forEach(D=>{const q=B("button",{class:"dock-tab",text:Ut.tabs[D],onclick:()=>st.set({panelTab:D})});n[D]=q,t.append(q)});const s=B("button",{class:"dock-close",text:"×",title:"关闭","aria-label":"关闭面板",onclick:()=>st.set({panelOpen:!1})});i.append(B("div",{class:"dock-top"},t,s),e.data,e.layers,e.settings);const r=B("select",{class:"sel","aria-label":"城市"});r.append(B("option",{value:"",text:Ut.data.custom}));for(const D of _r)r.append(B("option",{value:D.name,text:`${D.name}（${Eo(D.lat,1)}, ${Gr(D.lon,1)}）`}));r.addEventListener("change",()=>{r.value?Uh(r.value):st.set({city:""})});const a=B("div",{class:"note"}),o=(D,q,N,$,K)=>{const J=B("span",{class:"slider-out"}),rt=B("input",{type:"range",min:q,max:N,step:$,class:"range"});return rt.addEventListener("input",()=>K(Number(rt.value))),rt.addEventListener("change",()=>rt.blur()),{row:B("div",{class:"slider-row"},B("span",{class:"slider-label",text:D}),rt,J),input:rt,out:J}},l=o(Ut.data.lat,-90,90,.1,D=>st.set({lat:D,city:""})),c=o(Ut.data.lon,-180,180,.1,D=>st.set({lon:D,city:""})),h=Ca(Ut.data.refraction,st.state.refraction,D=>st.set({refraction:D}),"大气折射使太阳看起来略高，日出日落时刻略提前"),d=B("div",{class:"stats"}),f=B("div",{class:"stats"}),m=B("div",{class:"stats"}),g=La(d,[["直射点纬度","太阳赤纬"],["直射点经度"],["太阳黄经 · 节气"],["太阳赤经"],["日地距离"],["公转线速度"],["均时差","真太阳时 − 平太阳时"]]),_=La(f,[["黄赤交角"],["格林尼治恒星时"],["年内第几天"],["季节","按天文四季划分"]]),p=La(m,[["太阳高度角"],["太阳方位角"],["地方真太阳时"],["日出"],["日落"],["昼长"],["正午太阳高度"],["自转线速度"]]),u=B("div",{class:"chips scroll"}),M={};for(const D of kr){const q=B("button",{class:"chip",text:D.label,onclick:()=>st.set({chart:D.id})});M[D.id]=q,u.append(q)}const v=B("canvas",{class:"chart-canvas"}),x=B("p",{class:"note chart-desc"});e.data.append(bn("观测点",r,a,l.row,c.row,h.root),bn(Ut.data.sun,d),bn(Ut.data.earth,f),bn(Ut.data.observer,m),bn(Ut.data.charts,u,v,x));const L={},T=B("div",{class:"layer-bar"},B("button",{class:"chip",text:"全部开启",onclick:()=>st.set({layers:Object.fromEntries(mr.map(D=>[D,!0]))})}),B("button",{class:"chip",text:"全部关闭",onclick:()=>st.set({layers:Object.fromEntries(mr.map(D=>[D,D==="stars"]))})}),B("button",{class:"chip",text:"恢复默认",onclick:()=>st.set({layers:{...xc}})}));e.layers.append(T);for(const D of bh){const q=B("div",{class:"layer-list"});for(const N of Ua.filter($=>$.group===D)){const $=Ca(N.label,st.state.layers[N.id],J=>st.setLayer(N.id,J),N.hint),K=N.views.length===3?"":N.views.map(J=>Ut.views[J]).join("/");$.root.append(B("span",{class:"sw-tag",text:K})),L[N.id]=$,q.append($.root)}e.layers.append(bn(D,q))}const A=B("div",{class:"seg"}),z={};["high","medium","low"].forEach(D=>{const q=B("button",{class:"seg-btn",text:Ut.settings.qualities[D],onclick:()=>st.set({quality:D})});z[D]=q,A.append(q)});const S=Ca(Ut.settings.largeFont,st.state.largeFont,D=>st.set({largeFont:D})),w=B("button",{class:"btn wide",text:Ut.settings.fullscreen,onclick:Ec}),W=B("button",{class:"btn wide",text:Ut.settings.hideUI,onclick:()=>st.set({hideUI:!0})}),I=B("div",{class:"keys"});for(const[D,q]of Ut.keys)I.append(B("div",{class:"key-row"},B("kbd",{text:D}),B("span",{text:q})));e.settings.append(bn(Ut.settings.quality,A,B("p",{class:"note",text:"高：4K 贴图、高分屏渲染；低：2K 贴图、降低分辨率，适合手机与集显。"})),bn("显示",S.root,w,W),bn(Ut.settings.keys,I)),document.addEventListener("fullscreenchange",()=>{w.textContent=document.fullscreenElement?Ut.settings.exitFullscreen:Ut.settings.fullscreen});const j=()=>{const D=st.state;i.classList.toggle("open",D.panelOpen);for(const N of Object.keys(e))e[N].classList.toggle("active",D.panelTab===N),n[N].classList.toggle("on",D.panelTab===N);r.value!==D.city&&(r.value=D.city);const q=_r.find(N=>N.name===D.city);ii(a,q?.note??"点击地球表面，或拖动滑块自定义位置"),document.activeElement!==l.input&&(l.input.value=String(D.lat)),document.activeElement!==c.input&&(c.input.value=String(D.lon)),ii(l.out,Eo(D.lat,1)),ii(c.out,Gr(D.lon,1)),h.input.checked=D.refraction;for(const N of mr){const $=L[N];if(!$)continue;$.input.checked=D.layers[N];const K=Ua.find(J=>J.id===N);$.root.classList.toggle("inactive",!K.views.includes(D.view))}for(const N of Object.keys(z))z[N].classList.toggle("on",D.quality===N);S.input.checked=D.largeFont;for(const N of kr)M[N.id].classList.toggle("on",D.chart===N.id);ii(x,kr.find(N=>N.id===D.chart)?.desc??""),P=""};let P="";const F=()=>{const D=st.state;if(D.panelOpen&&D.panelTab==="data"){const q=st.tz,N=ie(D.time),$=Mh(N.lambda);g[0].set(`${Math.abs(N.dec).toFixed(3)}°${N.dec>=0?"N":"S"}`),g[1].set(Gr(N.subLon,2)),g[2].set(`${N.lambda.toFixed(2)}° · ${$.name}`),g[3].set(`${(N.ra/15).toFixed(3)} h`),g[4].set(`${To(N.distKm)} km（${N.R.toFixed(5)} AU）`),g[5].set(`${N.v.toFixed(3)} km/s`),g[6].set(`${N.eot>=0?"+":"−"}${Math.abs(N.eot).toFixed(2)} 分钟`),_[0].set(Ah(N.eps,3));const K=N.gmst/15;_[1].set(`${bo(K)}:${String(Math.floor(K*3600%60)).padStart(2,"0")}（${N.gmst.toFixed(2)}°）`),_[2].set(`第 ${Math.floor(Cr(D.time,q))+1} 天`);const J=N.lambda,rt=J<90?"春季":J<180?"夏季":J<270?"秋季":"冬季",Y=J<90?"秋季":J<180?"冬季":J<270?"春季":"夏季";_[3].set(`北半球${rt} · 南半球${Y}`);const Z=Pa(N,D.lat,D.lon),ht=D.refraction?Z.alt+Da(Z.alt):Z.alt,vt=D.refraction?-.833:-.267,dt=xh(D.time,D.lat,D.lon,vt);p[0].set(`${ht.toFixed(2)}°${ht<0?"（地平线下）":""}`),p[1].set(`${Z.az.toFixed(1)}°（${Vr(Z.az)}）`),p[2].set(bo(Z.solarTime)),dt.polar?(p[3].set(dt.polar==="day"?"极昼：太阳不落":"极夜：太阳不升"),p[4].set((dt.polar==="day","—")),p[5].set(dt.polar==="day"?"24 时":"0 时")):(p[3].set(`${So(dt.sunrise,q)}（方位 ${dt.riseAz.toFixed(0)}° ${Vr(dt.riseAz)}）`),p[4].set(`${So(dt.sunset,q)}（方位 ${dt.setAz.toFixed(0)}° ${Vr(dt.setAz)}）`),p[5].set(gs(dt.dayLength))),p[6].set(`${dt.noonAlt.toFixed(2)}°`),p[7].set(`${To(Gi(D.lat))} km/h`);const It=`${D.chart}|${Math.floor(D.time/3e4)}|${D.lat}|${D.lon}|${D.refraction}|${q}|${v.clientWidth}x${v.clientHeight}`;It!==P&&(P=It,e_(v,D.chart,{ms:D.time,lat:D.lat,lon:D.lon,tz:q,refraction:D.refraction}))}};return st.subscribe(D=>{["panelOpen","panelTab","city","lat","lon","refraction","layers","view","quality","largeFont","chart","beijing"].some(N=>D.has(N))&&(j(),F())}),j(),{tick:F}}function i_(i){const t=B("button",{class:"tl-play",title:"播放 / 暂停（空格）","aria-label":"播放或暂停",onclick:bc}),e=B("button",{class:"chip",text:Ut.timeline.now,title:"跳到现在并跟随真实时间",onclick:()=>st.set({time:Date.now(),speedIdx:0,playing:!0})}),n=B("button",{class:"chip toggle",onclick:()=>{const I=!st.state.beijing;st.set({beijing:I}),st.state.speedIdx===0&&st.set({time:Date.now()})}}),s=B("div",{class:"tl-date"}),r=B("span",{class:"tl-year-label",text:"—"}),a=I=>{const j=st.tz,P=He(st.state.time,j),F=P.year+I;if(F<1900||F>2100)return;const D=new Date(Date.UTC(F,P.month,0)).getUTCDate(),q=Math.min(P.day,D);Ao(vr(F,P.month,q,P.hour,P.minute,j))},o=B("button",{class:"chip sm year-nav",text:"‹",title:"上一年",onclick:()=>a(-1)}),l=B("button",{class:"chip sm year-nav",text:"›",title:"下一年",onclick:()=>a(1)}),c=B("div",{class:"tl-year",title:"切换年份"},o,r,l),h=B("div",{class:"speeds"}),d=Za.map((I,j)=>{const P=B("button",{class:"speed",text:I.label,onclick:()=>{j===0?st.set({speedIdx:0,time:Date.now(),playing:!0}):st.set({speedIdx:j})}});return h.append(P),P}),f=B("div",{class:"tl-top"},t,s,c,e,n),m=B("input",{type:"range",class:"range tl-range",min:0,max:365,step:1,"aria-label":"年内日期"}),g=B("div",{class:"tl-ticks"}),_=B("div",{class:"tl-months"}),p=B("div",{class:"tl-events"}),u=B("div",{class:"tl-slider"},B("div",{class:"tl-cap",text:Ut.timeline.year}),B("div",{class:"tl-track"},m,p,g,_)),M=B("input",{type:"range",class:"range tl-range",min:0,max:1439,step:1,"aria-label":"时刻"}),v=B("div",{class:"tl-hours"});for(const I of[0,6,12,18,24])v.append(B("span",{text:String(I),style:`left:${I/24*100}%`}));const x=B("div",{class:"tl-slider hour"},B("div",{class:"tl-cap",text:Ut.timeline.hour}),B("div",{class:"tl-track"},M,v)),L=B("div",{class:"tl-evbtns"}),T=["marEquinox","junSolstice","sepEquinox","decSolstice","perihelion","aphelion"];for(const I of T)L.append(B("button",{class:"chip sm"+(I==="perihelion"||I==="aphelion"?" alt":""),text:Ut.timeline.events[I],onclick:()=>Ao(Mc(I))}));i.append(f,B("div",{class:"tl-sliders"},u,x),B("div",{class:"tl-bottom"},L,h)),m.addEventListener("input",()=>{const I=st.state,j=st.tz,P=He(I.time,j),F=li(P.year,j)+Number(m.value)*864e5;st.set({time:F+(P.hour*3600+P.minute*60+P.second)*1e3}),w()}),M.addEventListener("input",()=>{const I=st.state,j=st.tz,P=He(I.time,j),F=Number(M.value);st.set({time:vr(P.year,P.month,P.day,Math.floor(F/60),F%60,j)}),w()});for(const I of[m,M])I.addEventListener("change",()=>I.blur());let A=-1,z=-1;const S=(I,j)=>{A=I,z=j;const P=vc(I);m.max=String(P-1),g.replaceChildren(),_.replaceChildren();for(let N=0;N<12;N++){const K=((Date.UTC(I,N,1)-Date.UTC(I,0,1))/864e5+.5)/P*100;g.append(B("i",{style:`left:${K}%`})),_.append(B("span",{text:`${N+1}`,style:`left:${K}%`}))}p.replaceChildren();const F=ts(I),D=li(I,j),q=[[F.marEquinox,"春分","season"],[F.junSolstice,"夏至","season"],[F.sepEquinox,"秋分","season"],[F.decSolstice,"冬至","season"],[F.perihelion,"近日点","apsis"],[F.aphelion,"远日点","apsis"]];for(const[N,$,K]of q)p.append(B("i",{class:K,title:$,style:`left:${((N-D)/864e5+.5)/P*100}%`}))},w=()=>{const I=st.state,j=st.tz,P=He(I.time,j);(P.year!==A||j!==z)&&S(P.year,j),ii(s,wh(I.time,j)),ii(r,String(P.year)),document.activeElement!==m&&(m.value=String(Math.floor(Cr(I.time,j)))),document.activeElement!==M&&(M.value=String(P.hour*60+P.minute))},W=()=>{const I=st.state;t.classList.toggle("playing",I.playing),t.innerHTML=I.playing?'<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>':'<svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',d.forEach((j,P)=>j.classList.toggle("on",P===I.speedIdx)),n.textContent=I.beijing?Ut.timeline.beijing:Ut.timeline.utc,n.classList.toggle("on",I.beijing),n.title=I.beijing?"当前显示北京时间（UTC+8），点击切换为 UTC":"当前显示 UTC，点击切换为北京时间（UTC+8）"};return st.subscribe(I=>{(I.has("playing")||I.has("speedIdx")||I.has("beijing"))&&W(),I.has("beijing")&&w()}),W(),w(),{tick:w}}function s_(i){const t=mn.map((x,L)=>B("button",{class:"ch-btn",title:`${x.num} ${x.title}`,onclick:()=>Ro(L)},B("span",{class:"ch-num",text:x.num}),B("span",{class:"ch-name",text:x.short}))),e=["earth","orbit","ground"].map(x=>B("button",{class:"seg-btn",text:Ut.views[x],title:`${Ut.views[x]}视图`,onclick:()=>Fs(x)})),n=["earth","orbit","ground"],s=["sphere","immersive"].map(x=>B("button",{class:"seg-btn",text:Ut.groundModes[x],onclick:()=>st.set({groundMode:x,view:"ground"})})),r=["sphere","immersive"],a=B("div",{class:"seg ground-modes"},...s),o=B("button",{class:"tb-btn",text:Ut.tabs.layers,onclick:()=>rs("layers")}),l=B("button",{class:"tb-btn",text:Ut.tabs.data,onclick:()=>rs("data")}),c=B("button",{class:"tb-btn",text:Ut.tabs.settings,onclick:()=>rs("settings")}),h=B("header",{class:"topbar"},B("div",{class:"brand"},B("span",{class:"brand-mark"}),B("span",{class:"brand-name",text:Ut.appTitle})),B("nav",{class:"chapters","aria-label":"章节"},...t),B("div",{class:"tb-right"},B("div",{class:"seg view-switch"},...e),B("div",{class:"tb-actions"},l,o,c))),d=B("aside",{class:"lesson glass"}),f=B("aside",{class:"dock glass"}),m=B("footer",{class:"timeline glass"}),g=B("div",{class:"look-pad glass"},...[["北",0],["东",90],["南",180],["西",270]].map(([x,L])=>B("button",{class:"chip sm",text:x,title:`朝向${x}`,onclick:()=>wo()?.lookAt(L,12)})),B("button",{class:"chip sm primary",text:"看太阳",onclick:()=>wo()?.lookAtSun()}),B("span",{class:"look-hint",text:"拖动环视 · 滚轮缩放视野"})),_=B("button",{class:"show-ui glass",text:Ut.settings.showUI,onclick:()=>st.set({hideUI:!1})}),p=B("div",{class:"intro"},B("div",{class:"intro-inner"},B("div",{class:"intro-kicker",text:"EARTH IN MOTION"}),B("h1",{class:"intro-title",text:Ut.intro.title}),B("p",{class:"intro-sub",text:Ut.intro.subtitle}),B("p",{class:"intro-desc",text:Ut.intro.desc}),B("button",{class:"intro-start",text:Ut.intro.start,onclick:()=>{st.set({introDone:!0,panelOpen:window.innerWidth>1100,panelTab:"data"}),ci(0,0),p.classList.add("leaving"),setTimeout(()=>p.remove(),1200)}}),B("p",{class:"intro-kicker soft",text:"中学地理 · 物理 · 交互演示"}),B("p",{class:"intro-hint",text:Ut.intro.hint})));i.append(h,d,f,g,m,_,p),V0(d);const u=n_(f),M=i_(m),v=()=>{const x=st.state;t.forEach((L,T)=>L.classList.toggle("on",T===x.chapter)),e.forEach((L,T)=>L.classList.toggle("on",x.view===n[T])),s.forEach((L,T)=>L.classList.toggle("on",x.groundMode===r[T])),a.classList.toggle("show",x.view==="ground"),o.classList.toggle("on",x.panelOpen&&x.panelTab==="layers"),l.classList.toggle("on",x.panelOpen&&x.panelTab==="data"),c.classList.toggle("on",x.panelOpen&&x.panelTab==="settings"),g.classList.toggle("show",x.view==="ground"&&x.groundMode==="immersive"),document.body.classList.toggle("ui-hidden",x.hideUI),document.documentElement.classList.toggle("large-font",x.largeFont),document.body.dataset.view=x.view};h.querySelector(".tb-right").prepend(a),st.subscribe(v),v(),setInterval(()=>{document.hidden||(M.tick(),u.tick())},100),window.addEventListener("keydown",x=>{if(x.ctrlKey||x.metaKey||x.altKey)return;const L=x.target,T=L?.tagName;if(T==="SELECT"||T==="TEXTAREA"||T==="INPUT"&&L.type!=="range"&&L.type!=="checkbox")return;if(!st.state.introDone){(x.code==="Space"||x.key==="Enter")&&(x.preventDefault(),p.querySelector(".intro-start")?.click());return}const A=x.key.toLowerCase();let z=!0;x.code==="Space"?bc():x.key==="ArrowRight"?yc():x.key==="ArrowLeft"?Sc():A>="1"&&A<="5"?Ro(Number(A)-1):A==="e"?Fs("earth"):A==="o"?Fs("orbit"):A==="g"?Fs("ground"):A==="l"?rs("layers"):A==="d"?rs("data"):A==="h"?st.set({hideUI:!st.state.hideUI}):A==="f"?Ec():x.key==="Escape"&&st.state.hideUI?st.set({hideUI:!1}):z=!1,z&&(x.preventDefault(),L&&T==="INPUT"&&L.blur(),T==="BUTTON"&&L.blur())})}function ms(i){const t=document.getElementById("boot-status");t&&(t.textContent=i)}async function pc(i=700){const t=document.getElementById("boot-loader");if(!t)return;const e=Number(t.dataset.t0||Date.now()),n=Math.max(0,i-(Date.now()-e));n&&await new Promise(s=>setTimeout(s,n)),ms("就绪"),t.setAttribute("aria-busy","false"),t.classList.add("done"),window.setTimeout(()=>t.remove(),800)}async function r_(){const i=document.getElementById("boot-loader");i&&(i.dataset.t0=String(Date.now())),ms("正在准备课堂…");const t=document.getElementById("root");t.innerHTML="",t.className="app";const e=document.createElement("div");e.className="scene";const n=document.createElement("div");n.className="ui";const s=document.createElement("div");s.className="vignette",t.append(e,s,n);let r;try{ms("初始化三维场景…"),st.set({playing:!0,speedIdx:2}),r=new G0(e)}catch(l){console.error(l),ms("无法初始化 WebGL"),e.innerHTML='<div class="fatal">无法初始化 WebGL，请更换支持 WebGL2 的浏览器后重试。</div>',await pc(400);return}ms("加载地球贴图…"),Ph(r),s_(n);let a=performance.now();const o=l=>{const c=Math.min((l-a)/1e3,.1);a=l;const h=st.state;h.playing&&(h.speedIdx===0?st.set({time:Date.now()}):st.set({time:h.time+c*1e3*Za[h.speedIdx].rate})),r.update(c),requestAnimationFrame(o)};requestAnimationFrame(o);try{await Promise.race([r.whenReady(),new Promise(l=>setTimeout(l,8e3))])}catch(l){console.warn("贴图加载未完全成功",l)}window.__eim={store:st,scene:r},await pc()}r_();
