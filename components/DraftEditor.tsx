
import React, { useState } from 'react';
import { Lead, Template, DraftConfig, SiteSection } from '../types';
import DemoView from './DemoView';
import { Button, Input, Label, Badge } from './ui/DesignSystem';
import { Save, RefreshCw, CheckCircle2, Monitor, Layout, Type, Plus, Phone, Upload, Image as ImageIcon, Trash2, DollarSign, BarChart } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface DraftEditorProps {
    lead: Lead;
    onExit: () => void;
}

const fontOptions = [
    { id: 'Inter', name: 'Inter' },
    { id: 'Open Sans', name: 'Open Sans' },
    { id: 'Montserrat', name: 'Montserrat' },
    { id: 'Merriweather', name: 'Merriweather' },
    { id: 'Space Grotesk', name: 'Space Grotesk' },
];

const DraftEditor: React.FC<DraftEditorProps> = ({ lead, onExit }) => {
    // Initial Config from Lead
    const [config, setConfig] = useState<DraftConfig>(lead.draft_config || {
        colors: { primary: '#000000', secondary: '#ffffff' },
        typography: 'Inter',
        businessName: lead.business_name || 'Minha Empresa',
        tagline: 'Slogan',
        industry: lead.industry || 'default',
        contact: { phone: lead.phone, email: lead.email, address: '' },
        pages: {
            home: { title: 'Home', slug: '/', sections: [] },
            about: { title: 'Sobre', slug: '/sobre', sections: [] },
            services: { title: 'Serviços', slug: '/servicos', sections: [] },
            contact: { title: 'Contato', slug: '/contato', sections: [] }
        }
    });

    const [activeTab, setActiveTab] = useState<'design' | 'content' | 'structure'>('design');
    const [activePage, setActivePage] = useState<'home' | 'about' | 'services' | 'contact'>('home');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
    const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);
    
    const isOffline = lead.id.startsWith('temp-');

    // --- HELPERS ---

    const updateColor = (type: 'primary' | 'secondary', value: string) => {
        setConfig(prev => ({ ...prev, colors: { ...prev.colors, [type]: value } }));
    };

    const updateSection = (pageKey: typeof activePage, sectionIndex: number, field: keyof SiteSection, value: any) => {
        const newSections = [...config.pages[pageKey].sections];
        newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: value };
        setConfig(prev => ({
            ...prev,
            pages: { ...prev.pages, [pageKey]: { ...prev.pages[pageKey], sections: newSections } }
        }));
    };

    const addSection = (type: SiteSection['type']) => {
        const newSection: SiteSection = {
            id: `sec-${Date.now()}`,
            type,
            title: type === 'pricing' ? 'Nossos Planos' : type === 'stats' ? 'Nossos Números' : 'Nova Seção',
            subtitle: 'Adicione uma descrição aqui.',
            items: type === 'pricing' 
                ? [{ title: 'Básico', price: 'R$ 99', desc: 'Descrição do plano.', features: ['Item 1', 'Item 2'] }] 
                : type === 'stats' 
                ? [{ title: 'Estatística', desc: '100+' }]
                : []
        };
        setConfig(prev => ({
            ...prev,
            pages: {
                ...prev.pages,
                home: { ...prev.pages.home, sections: [...prev.pages.home.sections, newSection] }
            }
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, pageKey: typeof activePage, sectionIndex: number) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        setUploadingImageId(`${pageKey}-${sectionIndex}`);

        try {
            if (isOffline) {
                // Mock upload for offline
                const reader = new FileReader();
                reader.onload = (ev) => {
                   updateSection(pageKey, sectionIndex, 'image', ev.target?.result as string);
                   setUploadingImageId(null);
                };
                reader.readAsDataURL(file);
                return;
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `img-${Date.now()}-${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('logos').upload(fileName, file); // Using logos bucket for simplicity or create 'images'
            
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(fileName);
            updateSection(pageKey, sectionIndex, 'image', publicUrl);

        } catch (err) {
            console.error("Upload failed", err);
            alert("Erro ao enviar imagem.");
        } finally {
            setUploadingImageId(null);
        }
    };

    const handleSave = async () => {
        if (isOffline) {
            alert('Modo demonstração: As alterações não são salvas no banco de dados.');
            return;
        }

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('leads')
                .update({ 
                    draft_config: config,
                    business_name: config.businessName,
                    phone: config.contact.phone
                })
                .eq('id', lead.id);

            if (error) throw error;
            setLastSaved(new Date());
        } catch (err) {
            console.error('Error saving draft:', err);
            alert('Erro ao salvar. Verifique sua conexão.');
        } finally {
            setIsSaving(false);
        }
    };

    const commonInputClass = "bg-white text-slate-900 border-zinc-300 focus:border-blue-500 focus:ring-blue-500";

    return (
        <div className="flex h-screen bg-zinc-100 overflow-hidden font-sans">
            {/* Sidebar Controls */}
            <aside className="w-96 bg-white border-r border-zinc-200 flex flex-col z-20 shadow-xl">
                {/* Header */}
                <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                        <Monitor className="w-5 h-5 text-blue-600" />
                        <span>Editor Visual</span>
                    </div>
                    {isOffline && <Badge variant="outline" className="text-[10px] bg-yellow-50 text-yellow-700 border-yellow-200">Offline</Badge>}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-zinc-200">
                    <button onClick={() => setActiveTab('design')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'design' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-zinc-50'}`}>Design</button>
                    <button onClick={() => setActiveTab('content')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'content' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-zinc-50'}`}>Conteúdo</button>
                    <button onClick={() => setActiveTab('structure')} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'structure' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-zinc-50'}`}>Estrutura</button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
                    
                    {/* --- DESIGN TAB --- */}
                    {activeTab === 'design' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cores da Marca</h3>
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-slate-700">Primária</Label>
                                        <div className="flex gap-2 mt-1">
                                            <Input type="color" className="w-10 h-10 p-1" value={config.colors.primary} onChange={(e) => updateColor('primary', e.target.value)} />
                                            <Input value={config.colors.primary} onChange={(e) => updateColor('primary', e.target.value)} className={commonInputClass} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-slate-700">Secundária</Label>
                                        <div className="flex gap-2 mt-1">
                                            <Input type="color" className="w-10 h-10 p-1" value={config.colors.secondary} onChange={(e) => updateColor('secondary', e.target.value)} />
                                            <Input value={config.colors.secondary} onChange={(e) => updateColor('secondary', e.target.value)} className={commonInputClass} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tipografia</h3>
                                <div className="space-y-2">
                                    {fontOptions.map((font) => (
                                        <div 
                                            key={font.id}
                                            className={`p-3 border rounded cursor-pointer text-sm flex justify-between items-center hover:bg-zinc-50 ${config.typography === font.id ? 'border-blue-600 bg-blue-50' : 'border-zinc-200'}`}
                                            onClick={() => setConfig({...config, typography: font.id})}
                                        >
                                            <span className="text-slate-800">{font.name}</span>
                                            {config.typography === font.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- CONTENT TAB --- */}
                    {activeTab === 'content' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            
                            {/* General Info */}
                            <div className="space-y-4 pb-6 border-b">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informações Gerais</h3>
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-slate-700">Nome do Negócio</Label>
                                        <Input value={config.businessName} onChange={(e) => setConfig({...config, businessName: e.target.value})} className={commonInputClass}/>
                                    </div>
                                    <div>
                                        <Label className="text-slate-700">Slogan / Tagline</Label>
                                        <Input value={config.tagline} onChange={(e) => setConfig({...config, tagline: e.target.value})} className={commonInputClass}/>
                                    </div>
                                    <div>
                                        <Label className="text-slate-700">WhatsApp / Telefone</Label>
                                        <Input value={config.contact.phone} onChange={(e) => setConfig({...config, contact: { ...config.contact, phone: e.target.value }})} className={commonInputClass}/>
                                    </div>
                                </div>
                            </div>

                            {/* Page Selection */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Editar Página</h3>
                                <div className="flex gap-2 bg-zinc-100 p-1 rounded-lg">
                                    {(['home', 'about', 'services', 'contact'] as const).map(p => (
                                        <button 
                                            key={p} 
                                            onClick={() => setActivePage(p)}
                                            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activePage === p ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sections Editor */}
                            <div className="space-y-6">
                                {config.pages[activePage].sections.map((section, idx) => (
                                    <div key={section.id} className="border rounded-lg bg-zinc-50 overflow-hidden">
                                        <div className="p-3 bg-white border-b flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-700 uppercase">{section.type}</span>
                                            <span className="text-[10px] text-slate-400">#{idx + 1}</span>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            {/* Text Fields */}
                                            {section.title !== undefined && (
                                                <div>
                                                    <Label className="text-xs text-slate-500 mb-1">Título</Label>
                                                    <textarea 
                                                        className={`w-full p-2 border rounded text-sm min-h-[60px] ${commonInputClass}`}
                                                        value={section.title}
                                                        onChange={(e) => updateSection(activePage, idx, 'title', e.target.value)}
                                                    />
                                                </div>
                                            )}
                                            {section.subtitle !== undefined && (
                                                <div>
                                                    <Label className="text-xs text-slate-500 mb-1">Subtítulo</Label>
                                                    <textarea 
                                                        className={`w-full p-2 border rounded text-sm min-h-[60px] ${commonInputClass}`}
                                                        value={section.subtitle}
                                                        onChange={(e) => updateSection(activePage, idx, 'subtitle', e.target.value)}
                                                    />
                                                </div>
                                            )}
                                            
                                            {/* Image Upload */}
                                            {section.image !== undefined && (
                                                <div>
                                                    <Label className="text-xs text-slate-500 mb-1">Imagem</Label>
                                                    <div className="flex gap-2 items-center">
                                                        <img src={section.image} className="w-10 h-10 object-cover rounded border bg-white" alt="Preview"/>
                                                        <label className="flex-1 cursor-pointer">
                                                            <div className={`flex items-center justify-center gap-2 py-2 px-3 border border-dashed rounded text-sm hover:bg-white transition-colors ${uploadingImageId === `${activePage}-${idx}` ? 'opacity-50' : ''}`}>
                                                                <Upload className="w-4 h-4 text-slate-400" />
                                                                <span className="text-slate-600">Trocar Imagem</span>
                                                            </div>
                                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, activePage, idx)} />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {config.pages[activePage].sections.length === 0 && (
                                    <p className="text-sm text-slate-400 text-center py-4">Nenhuma seção nesta página.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- STRUCTURE TAB --- */}
                    {activeTab === 'structure' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                             <div className="p-4 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
                                Adicione novas seções à página <strong>Home</strong>.
                             </div>
                             
                             <div className="grid grid-cols-2 gap-3">
                                 <button onClick={() => addSection('pricing')} className="p-4 border rounded hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center gap-2 transition-colors bg-white">
                                     <DollarSign className="w-5 h-5 text-slate-600" />
                                     <span className="text-xs font-bold text-slate-700">Preços</span>
                                 </button>
                                 <button onClick={() => addSection('stats')} className="p-4 border rounded hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center gap-2 transition-colors bg-white">
                                     <BarChart className="w-5 h-5 text-slate-600" />
                                     <span className="text-xs font-bold text-slate-700">Números</span>
                                 </button>
                                 <button onClick={() => addSection('faq')} className="p-4 border rounded hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center gap-2 transition-colors bg-white">
                                     <Type className="w-5 h-5 text-slate-600" />
                                     <span className="text-xs font-bold text-slate-700">FAQ</span>
                                 </button>
                                 <button onClick={() => addSection('gallery')} className="p-4 border rounded hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center gap-2 transition-colors bg-white">
                                     <ImageIcon className="w-5 h-5 text-slate-600" />
                                     <span className="text-xs font-bold text-slate-700">Galeria</span>
                                 </button>
                             </div>

                             <div className="mt-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Seções Ativas (Home)</h3>
                                <div className="space-y-2">
                                    {config.pages.home.sections.map((sec, i) => (
                                        <div key={sec.id} className="p-3 bg-white border rounded text-sm flex justify-between items-center shadow-sm">
                                            <span className="font-medium text-slate-700 flex items-center gap-2">
                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-500">{i+1}</span>
                                                {sec.type.toUpperCase()}
                                            </span>
                                            {/* Deletion logic could be added here */}
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </div>
                    )}

                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-zinc-200 bg-zinc-50 space-y-3">
                    <Button onClick={handleSave} disabled={isSaving || isOffline} className="w-full gap-2 font-bold shadow-md">
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                     <Button variant="outline" onClick={onExit} className="w-full text-slate-600 border-zinc-300">
                        Sair do Editor
                    </Button>
                </div>
            </aside>

            {/* Main Preview Area */}
            <main className="flex-1 flex flex-col relative bg-zinc-200">
                {/* Status Bar */}
                <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
                            <RefreshCw className="w-3 h-3 animate-pulse" /> Status: Em Criação
                        </div>
                        <span className="text-xs text-slate-400 hidden sm:inline">Última alteração: {lastSaved?.toLocaleTimeString()}</span>
                    </div>
                </header>

                {/* Preview Frame */}
                <div className="flex-1 overflow-hidden relative p-4 md:p-8 flex justify-center">
                    <div className="w-full max-w-[1400px] h-full bg-white shadow-2xl rounded-lg overflow-hidden border border-zinc-300 ring-4 ring-zinc-200">
                        <DemoView 
                            template={{id:'draft', name:'Draft', category:'Draft', description:'', image:''}} 
                            onBack={() => {}} 
                            onSelect={() => {}}
                            customConfig={config}
                            isDraftMode={true}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DraftEditor;
