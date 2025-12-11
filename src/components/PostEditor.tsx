import React, { useEffect, useRef, useState } from "react"
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonUnderline,
  MenuButtonBulletedList,
  RichTextEditor,
  type RichTextEditorRef,
  MenuButtonOrderedList,
  MenuButtonBlockquote,
  MenuButtonCode,
  MenuButtonCodeBlock,
} from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Box } from "@mui/material"
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import {
  PlusIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  onPublish: (content: string) => void
  requireAuth: (action: () => void) => void
}

const PostEditor: React.FC<Props> = ({ onPublish, requireAuth }) => {
  const editorRef = useRef<RichTextEditorRef>(null)
  const [showPicker, setShowPicker] = useState(false);

  const publish = () => {
    const editor = editorRef.current?.editor
    if (!editor) return

    const html = editor.getHTML().trim()

    if (!editor.getText().trim()) {
      alert("Please write something before publishing")
      return
    }

    onPublish(html)
    editor.commands.clearContent()
  }

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const editor = editorRef.current?.editor;
    if (!editor) return;

    editor.chain().focus().insertContent(emojiData.emoji).run();
    setShowPicker(false);
  };

  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false); // close picker
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      className="bg-white rounded-xl shadow-soft max-w-2xl mx-auto relative"
      onClick={() => {
        requireAuth(() => {});
      }}
    >

      {/* Emoji button + picker wrapper */}
      <div className="absolute top-[35%] left-2 -translate-y-1/2 z-20" ref={pickerRef}>

        {/* Emoji button */}
        <div
          onClick={(e) => {
            e.stopPropagation();       // prevent closing on Box click
            setShowPicker(!showPicker);
          }}
          className="px-2 py-1 text-lg cursor-pointer relative"
        >
          ☺
        </div>

        {/* Emoji picker positioned relative to button */}
        {showPicker && (
          <div className="absolute top-full left-0 z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      <RichTextEditor
        className="border-0 focus:ring-0 focus:outline-none active:ring-0 active:outline-none"
        ref={editorRef}
        extensions={[
          StarterKit,
          Placeholder.configure({
            placeholder: "How are you feeling today?",
          }),
        ]}
        renderControls={() => (
          <MenuControlsContainer className="flex items-center w-full p-0">
            <div className="bg-gray-100 flex items-center h-8 rounded-md p-2">
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              <MenuButtonUnderline />
              <MenuButtonBulletedList />
              <MenuButtonOrderedList />
              <MenuButtonBlockquote />
              <MenuButtonCode />
              <MenuButtonCodeBlock />
            </div>
            <div className="ml-auto">
              <button
                onClick={()=>alert('Function not implemented')}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-rose-200"
              >
                <TrashIcon className="w-4 h-4 text-sm text-rose-700" />
              </button>
            </div>
          </MenuControlsContainer>
        )}
        editorProps={{
          attributes: {
             class: "leading-snug min-h-[100px] max-h-[110px] overflow-y-auto px-2 py-1 pl-7 border-0 outline-none ring-0 shadow-none focus:outline-none focus:ring-0 hover:outline-none hover:ring-0 active:outline-none active:ring-0",
          },
        }}
      />

      {/* Bottom action row */}
      <div className="flex items-center justify-between p-2">
        {/* Left icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md" onClick={()=>alert('Function not implemented')}>
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </button>

          <button className="p-2" onClick={()=>alert('Function not implemented')}>
            <MicrophoneIcon className="w-4 h-4 text-gray-600" />
          </button>

          <button className="p-2" onClick={()=>alert('Function not implemented')}>
            <VideoCameraIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Right send button */}
        <button
          className="bg-blue-500 w-7 h-8 flex items-center justify-center rounded-full hover:bg-blue-600"
          onClick={() => requireAuth(publish)}
        >
          <PaperAirplaneIcon className="w-4 h-4 text-white" />
        </button>
      </div>

    </Box>
  );

}

export default PostEditor
