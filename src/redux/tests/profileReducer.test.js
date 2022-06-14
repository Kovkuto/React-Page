import profileReducer, { addPost } from "../profileReducer";

const state = {
    myPostsData: [
        {id: 1, text: "Hello from Kovkuto", likes: 10}
    ],
}

test("length of posts should increment", () => {
    const action = addPost("(^'I'^)")
    let newState = profileReducer(state, action)
    expect(newState.myPostsData.length).toBe(2)
})

test("id should be incremented", () => {
    const action = addPost("(^'I'^)")
    let newState = profileReducer(state, action)
    expect(newState.myPostsData[1].id).toBe(2)
})
