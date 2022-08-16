import React, { memo } from 'react';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export interface RichTextEditorProps {
  onChange?: (value: EditorState) => void;
  value?: EditorState;
  placeholder?: string;
  height?: number;
}

export const getPlainText = (value: EditorState) => {
  return value?.getCurrentContent()?.getPlainText('\u0001') ?? '';
};

export const getHTMLContent = (value) => {
  return stateToHTML(value.getCurrentContent());
};

export const RichTextEditor = memo(
  ({ value, onChange = () => {}, ...rest }: RichTextEditorProps) => {
    return (
      <Editor
        editorState={value || EditorState.createEmpty()}
        onChange={onChange}
        {...rest}
      />
    );
  }
);
