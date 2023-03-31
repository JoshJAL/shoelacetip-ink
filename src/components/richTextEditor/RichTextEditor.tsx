import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import RichTextButton from './RichTextButton';
import { FaBold, FaItalic, FaListOl, FaListUl, FaRedo, FaStrikethrough, FaUnderline, FaUndo } from 'react-icons/fa';
import Underline from '@tiptap/extension-underline';

const MenuBar = ({ editor }: { editor: any }) => {
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
    extensions: [StarterKit, Underline],
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
