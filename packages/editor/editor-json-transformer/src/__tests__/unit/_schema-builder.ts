import { Schema } from 'prosemirror-model';
import { createSchema } from '@atlaskit/editor-common';
export const schema: Schema = createSchema({
  nodes: [
    'doc',
    'paragraph',
    'text',
    'bulletList',
    'orderedList',
    'listItem',
    'heading',
    'blockquote',
    'codeBlock',
    'rule',
  ],
  marks: ['em', 'strong', 'code', 'strike', 'underline', 'textColor'],
});
