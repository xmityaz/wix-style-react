import React from 'react';
import {Html} from 'slate';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code'
};

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName];
      if (!type) return;
      return {
        kind: 'block',
        type: type,
        nodes: next(el.children)
      };
    },
    serialize(object, children) {
      if (object.kind !== 'block') return;
      switch (object.type) {
        case 'code': return <pre><code>{children}</code></pre>;
        case 'paragraph': return <p>{children}</p>;
        case 'quote': return <blockquote>{children}</blockquote>;
      }
    }
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName];
      if (!type) return;
      return {
        kind: 'mark',
        type: type,
        nodes: next(el.children)
      };
    },
    serialize(object, children) {
      if (object.kind !== 'mark') return;
      switch (object.type) {
        case 'bold': return <strong>{children}</strong>;
        case 'italic': return <em>{children}</em>;
        case 'underline': return <u>{children}</u>;
      }
    }
  }
];

export default new Html({rules});
