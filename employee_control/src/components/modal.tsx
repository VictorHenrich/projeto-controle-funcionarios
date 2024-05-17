import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalProps,
    ModalHeaderProps,
    ModalFooterProps,
    Stack
  } from '@chakra-ui/react'
import ButtonDefault from './button'


export interface ModalFooterDefaultProps extends ModalFooterProps{
    buttonMode?: "default" | "edit",
    enable?: boolean,
    onClose?: ()=> void,
    onConfirm?: ()=> void,
    buttonCloseName?: string,
    butttonConfirmName?: string
}

export interface ModalHeaderDefaultProps extends ModalHeaderProps{
    title?: string,
    enable?: boolean
}

export interface ModalDefaultProps extends ModalProps{
    HeaderProps?: ModalHeaderDefaultProps
    FooterProps?: ModalFooterDefaultProps
}

export default function ModalDefault({
    FooterProps = {
        buttonMode: "default",
        enable: true,
        onClose: () => null,
        onConfirm: () => null
    },
    HeaderProps = {
        title: "",
        enable: true
    },
    ...props
}: ModalDefaultProps){
    return (
        <Modal {...props}>
            <ModalOverlay />
            <ModalContent>
                {
                    HeaderProps.enable
                        ? (
                            <ModalHeader {...HeaderProps}>
                                {HeaderProps.title}
                            </ModalHeader>
                        )

                        : null
                }
                <ModalBody>
                    {props.children}
                </ModalBody>
                {
                    FooterProps.enable
                        ? (
                            <ModalFooter>
                                {
                                    FooterProps.buttonMode === "default"
                                        ? (
                                            <ButtonDefault 
                                                text={FooterProps.buttonCloseName || "Fechar"} 
                                                backgroundColor="red"
                                                onClick={FooterProps.onClose}
                                                color="white"
                                            />
                                        )

                                        : (
                                            <Stack
                                                width="100%"
                                                spacing={5}
                                                direction="row"
                                            >
                                                <ButtonDefault 
                                                    text={FooterProps.butttonConfirmName || "Confirmar"} 
                                                    backgroundColor="primary"
                                                    onClick={FooterProps.onConfirm}
                                                    color="white"
                                                />
                                                <ButtonDefault 
                                                    text={FooterProps.buttonCloseName || "Fechar"} 
                                                    backgroundColor="red"
                                                    onClick={FooterProps.onClose}
                                                    color="white"
                                                />
                                            </Stack>
                                        )
                                }
                            </ModalFooter>
                        )

                        : null
                }
            </ModalContent>
      </Modal>
    );
}