import React, { FC } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import Message from "../../shared/Message";

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
    align-items: flex-end;
    padding: 1.2rem 0;

    [type="submit"] {
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
}

export const MessageForm: FC<MessageFormProps> = ({ message }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{ content: message.content }}
            validate={values => {
                console.log("Validation:", values);
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log("Submission:", values);
                setTimeout(() => setSubmitting(false), 100);
            }}
        >
            {({
                touched,
                errors,
                values,
                handleChange,
                handleBlur,
                handleSubmit
            }) => (
                <StyledForm onSubmit={handleSubmit}>
                    <StyledTextarea
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter message ..."
                    />
                    <button type="submit">Send</button>
                </StyledForm>
            )}
        </Formik>
    );
};
