import React from "react";
import renderer from "react-test-renderer";
import { ChannelsList } from "../../public/components/ChannelsList";

describe("snapshots", () => {
    it("renders a list of channels", () => {
        const component = renderer
            .create(<ChannelsList channels={[]} onSelectChannel={() => {}} />)
            .toJSON();

        expect(component).toMatchSnapshot();
    });
});
