import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import RichTextButton from './RichTextButton';
import Link from '@tiptap/extension-link';
import {
  FaBold,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaUnlink
} from 'react-icons/fa';
import Underline from '@tiptap/extension-underline';
import { useCallback } from 'react';

const MenuBar = ({ editor }: { editor: any }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <RichTextButton
        additionalClasses={editor.isActive('bold') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaBold />
      </RichTextButton>
      <RichTextButton
        additionalClasses={editor.isActive('italic') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </RichTextButton>
      <RichTextButton
        additionalClasses={editor.isActive('underline') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FaUnderline />
      </RichTextButton>
      <RichTextButton
        additionalClasses={editor.isActive('strike') ? 'bg-lilacHover' : ''}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <FaStrikethrough />
      </RichTextButton>
      <RichTextButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        additionalClasses={editor.isActive('bulletList') ? 'bg-lilacHover' : ''}
      >
        <FaListUl />
      </RichTextButton>
      <RichTextButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        additionalClasses={editor.isActive('orderedList') ? 'bg-lilacHover' : ''}
      >
        <FaListOl />
      </RichTextButton>
      <button
        type='button'
        onClick={setLink}
        className={`font-semibold bg-lilac px-2 py-1 hover:bg-lilacHover  ${
          editor.isActive('link') ? 'bg-lilacHover' : ''
        }`}
      >
        <FaLink />
      </button>
      <button
        type='button'
        className='px-2 py-1 font-semibold bg-lilac hover:bg-lilacHover'
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        <FaUnlink />
      </button>
      <RichTextButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <FaUndo />
      </RichTextButton>
      <RichTextButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <FaRedo />
      </RichTextButton>
    </div>
  );
};

interface RichTextEditorProps {
  setText: (text: string) => void;
}

const RichTextEditor = ({ setText }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
    }
  });

  return (
    <>
      <MenuBar editor={editor} />
      <p className='pt-4 text-lg font-semibold'>Shift + Enter to add hard break</p>
      <div className='block w-full p-2 mt-4 text-lg border-2 rounded-lg border-lilac'>
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default RichTextEditor;
