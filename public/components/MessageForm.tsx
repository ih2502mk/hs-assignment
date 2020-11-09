import React, { FC, useContext } from "react";
import { Formik, useFormik } from "formik";
import styled from "styled-components";
import Message from "../../shared/Message";
import { UserContext } from "../context";

const StyledTextarea = styled.textarea`
    resize: none;
    flex-grow: 1;
    height: 80px;
    border-radius: 6px;
    border-width: 3px;
    padding: 0.6rem;

    :active,
    :focus {
        outline: none;
        border-color: rgb(117, 190, 255);
    }
`;

const StyledForm = styled.form`
    display: flex;
    padding: 1.2rem 0;

    > div {
        width: 125px;
        display: flex;
        flex-direction: column;
        align-items: normal;
        justify-content: space-between;
    }

    [type="submit"],
    [type="reset"] {
        padding: 0.6rem 1.2rem;
        border: 3px solid darkgrey;
        background-color: darkgrey;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 6px;
        margin-left: 0.6rem;

        :active,
        :focus {
            outline: none;
            border: 3px solid grey;
        }

        :active {
            transform: translate3d(1px, 1px, 0);
        }
    }
`;

interface MessageFormProps {
    message: Message;
    onSubmitMessage: (message: Message) => Promise<Message>;
    onDiscardMessage: () => void;
}

export const MessageForm: FC<MessageFormProps> = ({
    message,
    onSubmitMessage,
    onDiscardMessage
}) => {
    const user = useContext(UserContext);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { content: message.content },
        onSubmit: (values, { setSubmitting, setErrors, setFieldValue }) => {
            onSubmitMessage({
                ...message,
                content: values.content,
                author: user.name
            })
                .catch(err => {
                    setErrors({ content: err.message });
                })
                .finally(() => {
                    setSubmitting(false);
                    setFieldValue("content", "");
                });
        }
    });

    return (
        <StyledForm onSubmit={formik.handleSubmit}>
            <StyledTextarea
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                placeholder="Enter message ..."
            />
            <div>
                <button type="submit">{message.id ? "Update" : "Send"}</button>
                {message.id ? (
                    <button
                        type="reset"
                        onClick={() => {
                            formik.setFieldValue("content", "");
                            onDiscardMessage();
                        }}
                    >
                        Discard
                    </button>
                ) : null}
            </div>
        </StyledForm>
    );
};
