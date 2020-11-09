import React from "react";
import renderer from "react-test-renderer";
import { MessagesList } from "../../public/components/MessagesList";
import Message from "../../shared/Message";

const mockMessages: Message[] = [
    { id: "1", content: "Test Msg 1", author: "John", channelId: "ch1"},
    { id: "2", content: "Test Msg 2", author: "Bob", channelId: "ch1"},
    { id: "3", content: "Test Msg 3", author: "Alice", channelId: "ch1"},
    { id: "4", content: "Test Msg 4", author: "Walter", channelId: "ch1"},
];

describe("snapshots", () => {
    it("renders a list of messages", () => {
        const component = renderer
            .create(
                <MessagesList
                    messages={mockMessages}
                    activeMessage={mockMessages[0]}
                    onSelectMessage={() => {}}
                    onDeleteMessage={() => {}}
                />
            )
            .toJSON();

        expect(component).toMatchSnapshot();
    });
});
