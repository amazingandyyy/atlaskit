export default {
  props: {
    version: { type: 'enum', values: [1] },
    type: { type: 'enum', values: ['doc'] },
    content: {
      type: 'array',
      items: [
        [
          'paragraph',
          'bulletList',
          'mediaSingle',
          'orderedList',
          'heading',
          'panel',
          'blockquote',
          'rule',
          'codeBlock_no_marks',
          'code_block_with_breakout',
          'mediaGroup',
          'applicationCard',
          'decisionList',
          'taskList',
          'table',
          'extension',
          'bodiedExtension',
          'blockCard',
          'layoutSection',
        ],
      ],
      allowUnsupportedBlock: true,
    },
  },
};
