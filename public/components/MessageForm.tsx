import React, { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Message from "../../shared/Message";

interface MessageFormProps {
    message: Message;
}

export const MessageForm: FC<MessageFormProps> = ({ message }) => {
    return (
        <Formik
            initialValues={{content: message.content}}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setTimeout(() => setSubmitting(false), 100)
            }}
        >
            <Form>
                <Field as="textarea" name="content" />
                <button type="submit">Send</button>
            </Form>
        </Formik>
    );
};
