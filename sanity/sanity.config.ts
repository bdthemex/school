// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'
import { demoImporterTool } from './schemas/demo-importer/tool'

export default defineConfig({
  name: 'default',
  title: 'KJSGHS Info Hub',

  projectId: '8s8ujgvp',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), demoImporterTool()],

  schema: {
    types: schemaTypes,
  },
})
