// sanity/schemas/demo-importer/tool.tsx
import { definePlugin } from 'sanity'
import { route } from 'sanity/router'
import { UploadIcon } from '@sanity/icons'
import DemoImporter from './DemoImporter'
import React from 'react'

export const demoImporterTool = definePlugin({
  name: 'demo-importer-tool',
  title: 'Demo Content Importer',
  tools: [
    {
      name: 'demo-importer',
      title: 'Demo Content Importer',
      icon: UploadIcon,
      component: () => (
        <React.Suspense fallback={<div>Loading...</div>}>
          <DemoImporter />
        </React.Suspense>
      ),
      router: route.create('/'),
    },
  ],
})
