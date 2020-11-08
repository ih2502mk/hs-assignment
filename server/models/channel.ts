export class ChannelModel {
    static async allChannels() {
        return Promise.resolve([
            { id: "ch1", name: "channel 1" },
            { id: "ch2", name: "channel 2" }
        ]);
    }
}
