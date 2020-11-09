import React from "react";
import renderer from "react-test-renderer";
import { MessagesList } from "../../public/components/MessagesList";
import Message from "../../shared/Message";

const testDate = new Date(Date.UTC(2020, 11, 9, 10, 10, 10, 10));

const mockMessages: Message[] = [
    { id: "1", content: "Test Msg 1", author: "John", channelId: "ch1", created: testDate},
    { id: "2", content: "Test Msg 2", author: "Bob", channelId: "ch1", created: testDate},
    { id: "3", content: "Test Msg 3", author: "Alice", channelId: "ch1", created: testDate},
    { id: "4", content: "Test Msg 4", author: "Walter", channelId: "ch1", created: testDate},
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
