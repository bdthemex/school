
'use client';

import { useState, useEffect } from 'react';
import { getJsonFiles, getFileContent, saveFileContent } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { List, FileJson, Save } from 'lucide-react';

export default function AdminPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchFiles() {
      const fileList = await getJsonFiles();
      setFiles(fileList);
    }
    fetchFiles();
  }, []);

  const handleFileSelect = async (fileName: string) => {
    setIsLoading(true);
    setSelectedFile(fileName);
    try {
      const fileContent = await getFileContent(fileName);
      setContent(fileContent);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error loading file',
        description: (error as Error).message,
      });
      setContent('');
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      // Validate JSON content before saving
      JSON.parse(content);
      await saveFileContent(selectedFile, content);
      toast({
        title: 'File Saved!',
        description: `${selectedFile} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving file',
        description: `Invalid JSON format or another error occurred: ${(error as Error).message}`,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <FileJson className="w-6 h-6" /> JSON File Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="p-4 bg-muted">
                  <h3 className="font-semibold flex items-center gap-2">
                    <List className="w-5 h-5" /> Data Files
                  </h3>
                </CardHeader>
                <CardContent className="p-2">
                  <ul className="space-y-1">
                    {files.map((file) => (
                      <li key={file}>
                        <Button
                          variant={selectedFile === file ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => handleFileSelect(file)}
                        >
                          {file}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-3">
              {selectedFile ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Editing: <span className="text-primary">{selectedFile}</span>
                  </h2>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={25}
                    className="font-mono text-sm border-2 border-border focus:border-primary"
                    placeholder="Select a file to see its content..."
                    disabled={isLoading}
                  />
                  <Button onClick={handleSave} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-center p-8 border-2 border-dashed rounded-lg">
                  <p>Select a file from the left to start editing.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
