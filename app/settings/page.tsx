"use client";

import * as React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/workspace/sidebar-left";
import { Settings, Moon, Sun, Download, Upload, Trash2, Monitor, Key, Bot } from "lucide-react";
import { DecisionRepository } from "@/lib/repositories/decision-repository";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAISettings, saveAISettings, AIProviderSettings } from "@/services/ai/providers";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const [aiSettings, setAiSettings] = React.useState<AIProviderSettings>({ provider: "openai" });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAiSettings(getAISettings());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAiSettingsChange = (updates: Partial<AIProviderSettings>) => {
    const newSettings = { ...aiSettings, ...updates };
    setAiSettings(newSettings);
    saveAISettings(newSettings);
  };

  const handleExport = () => {
    const decisions = DecisionRepository.getAll();
    const blob = new Blob([JSON.stringify(decisions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `astra-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const imported = JSON.parse(content);
        
        if (!Array.isArray(imported)) {
          alert("Invalid backup file format.");
          return;
        }

        if (confirm("This will merge the imported decisions with your existing data. Continue?")) {
          const merged = [...DecisionRepository.getAll()];
        
          imported.forEach((imp: import("@/types/decision").Decision) => {
            const idx = merged.findIndex(m => m.id === imp.id);
            if (idx >= 0) merged[idx] = imp;
            else merged.push(imp);
          });
          
          merged.forEach(d => DecisionRepository.save(d));
          alert("Import successful!");
          window.location.reload();
        }
      } catch {
        alert("Failed to parse backup file.");
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm("WARNING: This will permanently delete ALL your decisions. This cannot be undone. Are you sure?")) {
      if (confirm("Are you sure? This will delete all your decisions and chat history. This cannot be undone.")) {
        DecisionRepository.clearAllData();
        alert("All workspace data has been removed.");
        window.location.href = "/";
      }
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <SidebarLeft />
        <main className="flex-1 flex flex-col h-full bg-background/50 overflow-hidden">
          <header className="shrink-0 sticky top-0 z-10 flex min-h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground" />
            <h1 className="text-lg font-semibold font-heading tracking-tight">Settings</h1>
          </header>

          <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mx-auto max-w-3xl flex flex-col gap-8 pb-12"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <Settings className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-heading">Workspace Settings</h2>
                  <p className="text-muted-foreground">Manage your preferences and data.</p>
                </div>
              </div>

              {/* Theme Settings */}
              <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Appearance</CardTitle>
                  <CardDescription>Customize how Astra looks on your device.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex-1 h-20 flex flex-col gap-2"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-5 w-5" />
                    Light
                  </Button>
                  <Button 
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex-1 h-20 flex flex-col gap-2"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-5 w-5" />
                    Dark
                  </Button>
                  <Button 
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex-1 h-20 flex flex-col gap-2"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-5 w-5" />
                    System
                  </Button>
                </CardContent>
              </Card>

              {/* AI Provider Settings */}
              <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">AI Providers (BYOK)</CardTitle>
                  <CardDescription>Bring your own API key to enable AI Copilot features. Keys are stored locally.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant={aiSettings.provider === "openai" ? "default" : "outline"}
                      className="flex-1 h-14 flex flex-row gap-2 justify-start px-4"
                      onClick={() => handleAiSettingsChange({ provider: "openai" })}
                    >
                      <Bot className="h-5 w-5" />
                      OpenAI (GPT-4o)
                    </Button>
                    <Button 
                      variant={aiSettings.provider === "anthropic" ? "default" : "outline"}
                      className="flex-1 h-14 flex flex-row gap-2 justify-start px-4"
                      onClick={() => handleAiSettingsChange({ provider: "anthropic" })}
                    >
                      <Bot className="h-5 w-5" />
                      Anthropic (Claude 3.5)
                    </Button>
                  </div>

                  {aiSettings.provider === "openai" && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="openai-key" className="text-sm font-medium text-foreground">OpenAI API Key</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="openai-key"
                          name="openai-key"
                          type="password" 
                          placeholder="sk-..." 
                          className="pl-10"
                          value={aiSettings.openaiKey || ""}
                          onChange={(e) => handleAiSettingsChange({ openaiKey: e.target.value })}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Your key is never sent to Astra&apos;s servers. It is used directly from your browser to the provider.</p>
                    </div>
                  )}

                  {aiSettings.provider === "anthropic" && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="anthropic-key" className="text-sm font-medium text-foreground">Anthropic API Key</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="anthropic-key"
                          name="anthropic-key"
                          type="password" 
                          placeholder="sk-ant-..." 
                          className="pl-10"
                          value={aiSettings.anthropicKey || ""}
                          onChange={(e) => handleAiSettingsChange({ anthropicKey: e.target.value })}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Your key is never sent to Astra&apos;s servers. It is used directly from your browser to the provider.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Data Management</CardTitle>
                  <CardDescription>Export your decisions or restore from a backup.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50">
                    <div>
                      <h4 className="font-semibold">Export Backup</h4>
                      <p className="text-sm text-muted-foreground">Download all your decisions as a JSON file.</p>
                    </div>
                    <Button onClick={handleExport} className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50">
                    <div>
                      <h4 className="font-semibold">Import Backup</h4>
                      <p className="text-sm text-muted-foreground">Restore decisions from a previous JSON export.</p>
                    </div>
                    <input 
                      id="import-backup"
                      name="import-backup"
                      aria-label="Import Backup JSON"
                      type="file" 
                      accept=".json" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleImport}
                    />
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-4 w-4" /> Import
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive/20 shadow-sm bg-destructive/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-destructive" />
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Destructive actions that cannot be undone.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border border-destructive/20 rounded-lg bg-background/50">
                    <div>
                      <h4 className="font-semibold text-destructive">Clear All Data</h4>
                      <p className="text-sm text-muted-foreground">Permanently delete all decisions and reset your workspace.</p>
                    </div>
                    <Button onClick={handleClearData} variant="destructive" className="w-full sm:w-auto">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Everything
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
