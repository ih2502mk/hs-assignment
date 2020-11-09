import { act } from "react-test-renderer";
import Message from "../../shared/Message";

const sortByDate = (a: Message, b: Message): number => {
    if (a.created > b.created) return 1;
    if (a.created < b.created) return -1;
    return 0;
};

export enum actionType {
    init,
    addToList,
    updateInList
}

export const messagesReducer = (
    state: Message[],
    action: {
        type: actionType;
        payload: Message[];
    }
) => {
    const newMessages = state.slice();

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
                .sort(sortByDate);

        case actionType.addToList:
            newMessages.push(...action.payload);
            return newMessages.sort(sortByDate);

        case actionType.updateInList:
            const updatedMessage = newMessages.find(
                m => m.id === action.payload[0].id
            );
            updatedMessage.content = action.payload[0].content;
            return newMessages;
    }
};
