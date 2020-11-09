import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import { MessageForm } from "../../public/components/MessageForm";
import Message from "../../shared/Message";

const emptyMessage: Message = {
    id: null,
    content: "",
    channelId: "",
    author: ""
};

const nonEmptyMessage: Message = {
    id: "test-id-1",
    content: "test test",
    channelId: "test-ch-id-1",
    author: "John"
};

describe("MessageForm", () => {
    it("shows send button for empty message", () => {
        const wrapper = mount(
            <MessageForm
                message={emptyMessage}
                onDiscardMessage={() => {}}
                onSubmitMessage={(m: Message) => Promise.resolve(m)}
            />
        );

        expect(wrapper.find('button').length).toEqual(1);
        expect(wrapper.find('button').text()).toEqual('Send');
    });

    it("shows update and discard buttons for empty message", () => {
        const wrapper = mount(
            <MessageForm
                message={nonEmptyMessage}
                onDiscardMessage={() => {}}
                onSubmitMessage={(m: Message) => Promise.resolve(m)}
            />
        );

        expect(wrapper.find('button').length).toEqual(2);
        expect(wrapper.find('button').first().text()).toEqual('Update');
        expect(wrapper.find('button').last().text()).toEqual('Discard');
    });
});

describe("snapshots", () => {
    it("renders empty form for message w/o id", () => {
        const component = renderer
            .create(
                <MessageForm
                    message={emptyMessage}
                    onDiscardMessage={() => {}}
                    onSubmitMessage={(m: Message) => Promise.resolve(m)}
                />
            )
            .toJSON();

        expect(component).toMatchSnapshot();
    });

    it("renders update form for message w/ id", () => {
        const component = renderer
            .create(
                <MessageForm
                    message={nonEmptyMessage}
                    onDiscardMessage={() => {}}
                    onSubmitMessage={(m: Message) => Promise.resolve(m)}
                />
            )
            .toJSON();

        expect(component).toMatchSnapshot();
    });
});
