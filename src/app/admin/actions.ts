
'use server';

import fs from 'fs/promises';
import path from 'path';

// Define the path to the data directory.
// Using path.join ensures cross-platform compatibility.
const dataDirectory = path.join(process.cwd(), 'src', 'data');

/**
 * Reads the data directory and returns a list of all .json files.
 */
export async function getJsonFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(dataDirectory);
    return files.filter((file) => path.extname(file) === '.json');
  } catch (error) {
    console.error('Error reading data directory:', error);
    // In a real app, you might want to throw the error or handle it differently.
    return [];
  }
}

/**
 * Reads the content of a specific JSON file.
 * @param fileName The name of the file to read (e.g., "notices.json").
 * @returns The content of the file as a string.
 */
export async function getFileContent(fileName: string): Promise<string> {
  // Basic security check to prevent directory traversal attacks.
  if (fileName.includes('..')) {
    throw new Error('Invalid file name.');
  }

  const filePath = path.join(dataDirectory, fileName);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error);
    throw new Error(`Could not read file: ${fileName}`);
  }
}

/**
 * Saves new content to a specific JSON file.
 * @param fileName The name of the file to write to.
 * @param content The new content to save (should be a valid JSON string).
 */
export async function saveFileContent(fileName: string, content: string): Promise<void> {
  if (fileName.includes('..')) {
    throw new Error('Invalid file name.');
  }

  try {
    // Attempt to parse the JSON to ensure it's valid before writing.
    const parsedContent = JSON.parse(content);
    // Re-stringify with indentation for readability.
    const formattedContent = JSON.stringify(parsedContent, null, 2);
    
    const filePath = path.join(dataDirectory, fileName);
    await fs.writeFile(filePath, formattedContent, 'utf8');
  } catch (error) {
    console.error(`Error saving file ${fileName}:`, error);
    if (error instanceof SyntaxError) {
      throw new Error('The content is not valid JSON.');
    }
    throw new Error(`Could not save file: ${fileName}`);
  }
}
