import React from 'react';
import {Raw} from 'slate';
import htmlSerializer from './htmlSerializer';

describe('HTML serializer', () => {
  it('should correctly deserialize simple HTML paragraph', () => {
    const text = '<p>Hello</p>';
    const expected = {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {
              kind: 'text',
              text: 'Hello'
            }
          ]
        }
      ]
    };
    const deserialized = htmlSerializer.deserialize(text);
    expect(Raw.serialize(deserialized, {terse:true})).toEqual(expected);
  });

  it('should correctly serialize simple HTML paragraph', () => {
    const expected = '<p>Hello</p>';
    const state = {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {
              kind: 'text',
              text: 'Hello'
            }
          ]
        }
      ]
    };
    const deserialized = Raw.deserialize(state, {terse:true});
    expect(htmlSerializer.serialize(deserialized)).toEqual(expected);
  });

  it('should correctly deserialize HTML string', () => {
    const text = `<h1>noop</h1><p>Hello</p><strong>bold text</strong>,<em>italic<u>and underlined</u></em>`;
    //const expected = {
    //  nodes: [
    //    {
    //      kind: 'block',
    //      type: 'paragraph',
    //      nodes: [
    //        {
    //          kind: 'text',
    //          text: 'noop'
    //        }
    //      ]
    //    },
    //    {
    //      kind: 'block',
    //      type: 'paragraph',
    //      nodes: [
    //        {
    //          kind: 'text',
    //          text: 'Hello'
    //        }
    //      ]
    //    },
    //    {
    //      kind: 'block',
    //      type: 'paragraph',
    //      nodes: [
    //        {
    //          kind: 'text',
    //          text: 'noop'
    //        }
    //      ]
    //    },
    //  ]
    //};
    const expected = {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            { kind: 'text', text: 'noop' }
          ]
        },
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            { kind: 'text', text: 'Hello' }
          ]
        },
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {
              kind: 'text',
              ranges: [
                {
                  text: 'bold text',
                  marks: [
                    { type: 'bold' }
                  ]
                },
                {
                  text: 'italic',
                  marks: [
                    { type: 'italic' }
                  ]
                },
                {
                  text: 'and underlined',
                  marks: [
                    { type: 'underline' },
                    { type: 'italic' }
                  ]
                }
              ]
            }
          ]
      }]
    };

    const deserialized = htmlSerializer.deserialize(text);
    expect(Raw.serialize(deserialized, {terse:true})).toEqual(expected);
  });
});