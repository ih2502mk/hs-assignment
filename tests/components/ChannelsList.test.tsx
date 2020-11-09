import React from "react";
import renderer from "react-test-renderer";
import { ChannelsList } from "../../public/components/ChannelsList";
import Channel from "../../shared/Channel";

const mockChannels: Channel[] = [
    { id: "test-ch-1", name: "Test Channel 1" },
    { id: "test-ch-2", name: "Test Channel 2" },
    { id: "test-ch-3", name: "Test Channel 3" }
];

describe("snapshots", () => {
    it("renders a list of channels", () => {
        const component = renderer
            .create(
                <ChannelsList
                    channels={mockChannels}
                    onSelectChannel={() => {}}
                    activeChannel={mockChannels[1]}
                />
            )
            .toJSON();

        expect(component).toMatchSnapshot();
    });
});
