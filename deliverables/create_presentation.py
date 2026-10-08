from pathlib import Path
from copy import deepcopy
from lxml import etree as E
import zipfile, re

ROOT = Path(__file__).parent
SOURCE = Path(r'C:\Users\Varshitha\Downloads\AI_Pulse_Overview.pptx')
OUT = ROOT / 'BELLORA_PULSE_Project_Overview.pptx'
NS = {'a':'http://schemas.openxmlformats.org/drawingml/2006/main', 'p':'http://schemas.openxmlformats.org/presentationml/2006/main'}
def q(tag):
    pre, local = tag.split(':'); return '{'+NS[pre]+'}'+local
def el(parent, tag, **attrs): return E.SubElement(parent, q(tag), **{k:str(v) for k,v in attrs.items()})
def get_text(sp): return '\n'.join(''.join(p.xpath('.//a:t/text()', namespaces=NS)) for p in sp.findall('p:txBody/a:p',NS))
def replace(sp, text):
    body = sp.find('p:txBody', NS)
    old = body.find('a:p', NS)
    props = old.find('a:pPr', NS)
    for p in body.findall('a:p', NS): body.remove(p)
    for line in text.split('\n'):
        p = el(body,'a:p')
        if props is not None: p.append(deepcopy(props))
        r = el(p,'a:r'); el(r,'a:t').text = line
    bp=body.find('a:bodyPr',NS); bp.set('wrap','square')
    for child in list(bp):
        if E.QName(child).localname in ['spAutoFit','normAutofit','noAutofit']: bp.remove(child)
    el(bp,'a:normAutofit')

CHANGES = {
1:{'News, useful resources and career opportunities.':'News, tools, podcasts and trusted AI voices.', 'JOBS':'AI TOOLS', 'Explore opportunities to contribute':'Find useful tools for everyday work'},
2:{'A website for discovering AI information and opportunities in one place.':'A single starting point for AI news, tools, podcasts and creators.', 'Explore careers':'Discover tools', 'Jobs and internships':'Practical AI resources', 'Browse connected employer\nlistings and follow application\nlinks.':'Search tools by task, pricing\nand category; save useful\noptions for later.'},
3:{'Learning and jobs take extra\neffort':'Learning takes extra effort', 'Useful voices and career\nopportunities live on different\nplatforms.':'Useful tools, podcasts and\nexpert voices live on different\nplatforms.'},
4:{'A clear path from awareness to learning and opportunity.':'A clear path from awareness to learning and practical discovery.', 'Help users continue to\npublishers, resources and\nemployers.':'Connect readers to original\npublishers, useful tools and\ncreator resources.'},
5:{'Job seekers':'Working professionals', 'Explore roles from connected employers.':'Find tools and ideas for everyday work.'},
6:{'News + AI tools':'News discovery', 'Jobs':'AI tools + podcasts', 'Role discovery, filters, details and employer application links.':'Find tools by task and pricing; browse shows and save episodes.', 'Why useful: follow updates, find resources and explore roles in one workflow.':'Why useful: follow updates, discover tools and keep learning in one place.'},
8:{'EXPLORE CAREER OPPORTUNITIES':'DISCOVER PRACTICAL AI TOOLS', 'Jobs Section':'AI Tools Directory', 'Discover roles':'Find your next tool', 'Search by role, company or skill\nacross connected employers.':'Search tools by name, task\nor useful features.', 'Use available location, experience\nand work-arrangement filters.':'Filter by category, pricing\nand open-source availability.', 'Save and apply':'Save and explore', 'Read a listing, save it and continue\nto the employer�s application page.':'Save favourites, view details\nand visit the official website.'},
9:{'Learning / Resources':'Creator Directory'},
10:{'JOBS':'TOOLS / AUDIO', 'Employer APIs':'Curated catalogs', 'Standardise data':'Tasks + topics', 'Temporary cache':'Search + save', 'Details + apply':'Official links'},
11:{'ACTUAL LOCAL WEBSITE':'RESPONSIVE EXPERIENCE', 'DESKTOP / DARK THEME':'DESKTOP / INFORMATION HIERARCHY', 'MOBILE / LIGHT THEME':'MOBILE / STACKED CONTENT', 'Clear navigation, topic filters and a layout that adapts to the screen.':'News, Tools, Podcasts and Creators — with saved items and theme controls.'},
12:{'Providers and news records':'GNews + catalogs + storage'},
13:{'Jobs and resources':'Tools, podcasts and creators', 'Employer-feed jobs board and curated creator directory':'Searchable catalogs, creator profiles and saved resources', '148 tests passed across 16 test files':'Current scope: news, tools, podcasts and creators', 'Last verified test run during presentation preparation; AI modules require configuration.':'Source-reviewed overview. Deployment and live integrations are not verified by this deck.'},
14:{'Add collection history, broader\nbrowser tests and more\nemployer sources.':'Add collection history, broader\nbrowser checks and stronger\nsource monitoring.', 'B\nlogs':'Expand discovery', 'Deepen AI understanding':'Improve resource coverage', 'Create original articles, explainers and opinion pieces that help users understand the impact of AI.':'Broaden tool and podcast coverage, improve catalog freshness and refine discovery filters.'},
15:{'Career opportunities':'Useful tools and podcasts'},
16:{'Career opportunities':'Useful tools and podcasts', 'One organised starting point for exploring AI.':'Developed by - Indrasena Seetana\nAI Sr ERP Applications Engineer | Bell Integrations'},
}

def shape(tree,x,y,w,h,text='',size=18,color='FFFFFF',fill=None,bold=False):
    ids=[int(v) for v in tree.xpath('.//p:cNvPr/@id',namespaces=NS)]
    sp=el(tree,'p:sp'); nv=el(sp,'p:nvSpPr'); el(nv,'p:cNvPr',id=max(ids+[1])+1,name='Project content'); el(nv,'p:cNvSpPr',txBox='1'); el(nv,'p:nvPr')
    pr=el(sp,'p:spPr'); xf=el(pr,'a:xfrm'); el(xf,'a:off',x=round(x),y=round(y)); el(xf,'a:ext',cx=round(w),cy=round(h)); geom=el(pr,'a:prstGeom',prst='rect'); el(geom,'a:avLst')
    if fill: el(el(pr,'a:solidFill'),'a:srgbClr',val=fill)
    else: el(pr,'a:noFill')
    el(el(pr,'a:ln'),'a:noFill')
    tx=el(sp,'p:txBody'); el(el(tx,'a:bodyPr',wrap='square',lIns='0',rIns='0',tIns='0',bIns='0'),'a:normAutofit'); el(tx,'a:lstStyle')
    for line in text.split('\n'):
        p=el(tx,'a:p'); pp=el(p,'a:pPr'); el(el(pp,'a:lnSpc'),'a:spcPct',val=120000)
        rp=el(pp,'a:defRPr',sz=round(size*100),b='1' if bold else '0'); el(el(rp,'a:solidFill'),'a:srgbClr',val=color); el(rp,'a:latin',typeface='Segoe UI')
        el(el(p,'a:r'),'a:t').text=line
    return sp

PANELS={
7:('NEWS DISCOVERY', [('01 / BROWSE','AI, startups, funding and more'),('02 / REFINE','Search, sort and explore headlines'),('03 / READ & SAVE','Open original sources; bookmark stories')]),
8:('YOUR AI TOOLKIT', [('01 / SEARCH','Find a tool by name, task or feature'),('02 / FILTER','Category · Pricing · Open source · A–Z'),('03 / KEEP','Save favourites and explore details')]),
9:('VOICES WORTH FOLLOWING', [('01 / DISCOVER','Individuals, publications and communities'),('02 / REFINE','Topics · Profile type · Content format'),('03 / CONTINUE','Read profiles and open public resources')])}

with zipfile.ZipFile(SOURCE) as src:
    files={n:src.read(n) for n in src.namelist()}
for i in range(1,17):
    name=f'ppt/slides/slide{i}.xml'; root=E.fromstring(files[name]); tree=root.find('p:cSld/p:spTree',NS)
    for sp in root.findall('.//p:sp',NS):
        old=get_text(sp)
        if not old: continue
        new=CHANGES.get(i,{}).get(old,old)
        if i==14 and old.replace('\n','')=='Blogs': new='Expand discovery'
        if re.fullmatch(r'\d+\s*/\s*16',old.replace('\n','')): new=f'{i:02d} / 16'
        new=new.replace('AI Pulse','BELLORA.PULSE').replace('AI PULSE','BELLORA.PULSE')
        replace(sp,new)
        if re.fullmatch(r'\d+ / 16',new):
            xf=sp.find('p:spPr/a:xfrm',NS)
            xf.find('a:off',NS).set('x','10900000')
            xf.find('a:ext',NS).set('cx','760000')
            xf.find('a:ext',NS).set('cy','240000')
        if i==14 and new=='Expand discovery':
            sp.find('p:spPr/a:xfrm/a:ext',NS).set('cx','2600000')
        if i==16 and new=='Thank You':
            sp.find('p:spPr/a:xfrm/a:ext',NS).set('cy','850000')
            for rp in sp.findall('.//a:defRPr',NS): rp.set('sz','4200')
        # The longer project brand needs a smaller cover font.
        if new=='BELLORA.PULSE':
            for rp in sp.findall('.//a:defRPr',NS):
                if int(rp.get('sz','0'))>4000: rp.set('sz','4400')
        if i==16 and new.startswith('Developed by'):
            for rp in sp.findall('.//a:defRPr',NS): rp.set('sz','1400')
            sp.find('p:spPr/a:xfrm/a:ext',NS).set('cy','620000')
    if i in PANELS:
        for pic in tree.findall('p:pic',NS): tree.remove(pic)
        x,y,w,h=4564380,1816100,6949440,4343400
        shape(tree,x,y,w,h,fill='101C30')
        heading, rows=PANELS[i]
        shape(tree,x+330000,y+260000,w-660000,350000,heading,19,'75AAFF',bold=True)
        for j,(title,body) in enumerate(rows):
            yy=y+900000+j*970000
            shape(tree,x+300000,yy,w-600000,790000,fill='192941')
            shape(tree,x+500000,yy+110000,w-1000000,280000,title,17,bold=True)
            shape(tree,x+500000,yy+430000,w-1000000,280000,body,15,'A5B5CC')
        shape(tree,x+330000,y+h-310000,w-660000,200000,'FEATURE FLOW / CURRENT PROJECT',10,'A5B5CC')
    if i==11:
        for pic in tree.findall('p:pic',NS): tree.remove(pic)
        x,y,w,h=628650,2019300,7747000,3873500
        shape(tree,x,y,w,h,fill='101C30')
        shape(tree,x+200000,y+190000,w-400000,270000,'BELLORA.PULSE    News  ·  Tools  ·  Podcasts  ·  Creators',15,'75AAFF',bold=True)
        shape(tree,x+200000,y+780000,w-400000,500000,'Discover what is happening in AI.',25,bold=True)
        shape(tree,x+200000,y+1420000,w-400000,270000,'Search headlines     /     Browse topics     /     Saved items',14,'A5B5CC')
        for j,(title,desc) in enumerate([('Featured story','Headline + source'),('Latest updates','Cards + categories'),('Explore more','Tools + podcasts')]):
            xx=x+200000+j*2450000
            shape(tree,xx,y+2020000,2250000,1150000,fill='192941')
            shape(tree,xx+150000,y+2230000,1950000,340000,title,18,bold=True)
            shape(tree,xx+150000,y+2710000,1950000,250000,desc,13,'A5B5CC')
        shape(tree,x+200000,y+3420000,w-400000,220000,'ILLUSTRATIVE LAYOUT / NOT A LIVE SCREENSHOT',10,'A5B5CC')
        x,y,w,h=9311477,1943100,1760545,3810000
        shape(tree,x,y,w,h,fill='EFF4FB')
        shape(tree,x+120000,y+180000,w-240000,210000,'BELLORA.PULSE',12,'244777',bold=True)
        shape(tree,x+120000,y+620000,w-240000,480000,'Discover AI\non the go.',19,'101C30',bold=True)
        for j,title in enumerate(['Search & topics','Featured story','Latest updates','Saved items']):
            shape(tree,x+100000,y+1400000+j*500000,w-200000,370000,fill='DDE7F4')
            shape(tree,x+170000,y+1480000+j*500000,w-340000,240000,title,12,'244777')
    files[name]=E.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
# Use the reference's polished closing layout for the final acknowledgement.
root=E.fromstring(files['ppt/slides/slide15.xml'])
for sp in root.findall('.//p:sp',NS):
    old=get_text(sp)
    if 'Understand what is new.' in old: replace(sp,'Thank you.\nQuestions, ideas or feedback?')
    elif old=='15 / 16': replace(sp,'16 / 16')
    elif old=='One organised starting point for exploring AI.':
        replace(sp,'Developed by - Indrasena Seetana\nAI Sr ERP Applications Engineer | Bell Integrations')
        sp.find('p:spPr/a:xfrm/a:ext',NS).set('cy','580000')
        for rp in sp.findall('.//a:defRPr',NS): rp.set('sz','1400')
files['ppt/slides/slide16.xml']=E.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
# Remove old speaker-note wording while retaining note masters and layouts.
for n in list(files):
    if re.match(r'ppt/notesSlides/notesSlide\d+\.xml$',n):
        r=E.fromstring(files[n])
        for t in r.findall('.//a:t',NS): t.text=''
        files[n]=E.tostring(r,xml_declaration=True,encoding='UTF-8',standalone=True)
with zipfile.ZipFile(OUT,'w',zipfile.ZIP_DEFLATED) as dst:
    for n,data in files.items(): dst.writestr(n,data)
with zipfile.ZipFile(OUT) as z:
    assert z.testzip() is None
    for n in z.namelist():
        if n.endswith('.xml'): E.fromstring(z.read(n))
    text='\n'.join(' '.join(E.fromstring(z.read(f'ppt/slides/slide{i}.xml')).xpath('//a:t/text()',namespaces=NS)) for i in range(1,17))
    assert not re.search(r'\bjobs\b|\bcareer\b|\bblogs\b|148 tests',text,re.I), text
    (ROOT/'BELLORA_PULSE_Slide_Text.txt').write_text(text,encoding='utf-8')
print(OUT)
