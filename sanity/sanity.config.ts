// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'
import { demoImporterTool } from './schemas/demo-importer/tool'
import { CogIcon, HomeIcon, LinkIcon } from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'KJSGHS Info Hub',

  projectId: '8s8ujgvp',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Homepage')
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.listItem()
              .title('Navigation')
              .icon(LinkIcon)
              .child(
                S.list()
                  .title('Navigation Menus')
                  .items([
                    S.listItem()
                      .title('Header Navigation')
                      .child(
                        S.document()
                          .schemaType('navigation')
                          .documentId('headerNavigation')
                      ),
                    S.listItem()
                      .title('Footer Links Column 1')
                      .child(
                        S.document()
                          .schemaType('navigation')
                          .documentId('footerLinksCol1')
                      ),
                     S.listItem()
                      .title('Footer Links Column 2')
                      .child(
                        S.document()
                          .schemaType('navigation')
                          .documentId('footerLinksCol2')
                      ),
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['siteSettings', 'homepage', 'navigation', 'studentResult'].includes(
                  listItem.getId() || ''
                )
            ),
             S.documentTypeListItem('studentResult').title('Student Results'),
          ]),
    }),
    visionTool(),
    demoImporterTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
