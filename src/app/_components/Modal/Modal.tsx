import { useRef, type ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  cancelLabel?: string;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  description,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  onCancel,
  onSubmit,
}: ModalProps): JSX.Element => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleCancel = () => {
    setIsOpen(false);
    onCancel?.();
  };

  const handleSubmit = () => {
    setIsOpen(false);
    onSubmit?.();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
      initialFocus={titleRef}
    >
      <div
        id="modal-backdrop"
        className="fixed inset-0 bg-black/60"
        aria-hidden="true"
      />

      <div
        id="modal-container"
        className="fixed inset-0 box-border flex w-screen items-center justify-center p-1"
      >
        <Dialog.Panel
          id="modal-panel"
          className="flex w-full max-w-xs flex-col gap-2 rounded bg-white p-2"
        >
          <Dialog.Title ref={titleRef}>
            <div
              id="title-container"
              className="flex items-center justify-between"
            >
              {title}
              <XMarkIcon
                onClick={handleCancel}
                className="h-5 w-5 cursor-pointer rounded hover:bg-gray-100"
              />
            </div>
          </Dialog.Title>
          {description && (
            <Dialog.Description>{description}</Dialog.Description>
          )}

          {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
          {(onCancel || onSubmit) && (
            <div id="actions-container" className="flex justify-end gap-1">
              <button
                className="rounded border border-black p-1 px-3 hover:bg-gray-100"
                onClick={handleCancel}
              >
                {cancelLabel}
              </button>
              <button
                className="rounded border border-black p-1 px-3 hover:bg-gray-100"
                onClick={handleSubmit}
              >
                {submitLabel}
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
