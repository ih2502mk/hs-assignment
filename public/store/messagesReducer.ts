import { act } from "react-test-renderer";
import Message from "../../shared/Message";

export enum actionType {
    init
}

export const messagesReducer = (
    state: Message[],
    action: {
        type: actionType;
        payload: Message[];
    }
) => {
    const messages = state.slice();

    switch (action.type) {
        case actionType.init:
            return action.payload
                .map(m => {
                    return {
                        ...m,
                        created: m.created ? new Date(m.created) : null,
                        updated: m.updated ? new Date(m.updated) : null
                    };
                })
                .sort((a, b) => {
                    if (a.created > b.created) return 1;
                    if (a.created < b.created) return -1;
                    return 0;
                });
    }
};
