import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface BackdropProps {
  onClose: () => void;
}

interface ModalOverlayProps {
  children: any;
}

interface ModalProps extends ModalOverlayProps, BackdropProps {}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </>
  );
};

export default Modal;
