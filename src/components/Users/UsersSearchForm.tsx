import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/redux-store';
import { getUsers, setCurrentPage, UsersFormFilter } from '../../redux/usersReducer/usersReducer';
import { useSearchParams } from 'react-router-dom';
import { getUsersFilter } from '../../redux/selectors/usersSelectors';
import { hasValueObjQ } from '../../api/api';


type FriendForm = "true" | "false" | "null"

type UsersSearchFormType = {
    term: string,
    friend: FriendForm
}

const UsersSearchForm: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const pageSize = useSelector<StateType, number>(state => state.usersPage.pageSize)
    const filter = useSelector(getUsersFilter)
    const [query, setQuery] = useSearchParams()

    const onSubmit = (filter: UsersSearchFormType, { setSubmitting }: FormikHelpers<UsersSearchFormType>) => {

        const parsedFilter: UsersFormFilter = {
            term: filter.term,
            friend: filter.friend === "true" ? true : filter.friend === "false" ? false : null
        }

        setQuery(hasValueObjQ({page: 1, ...parsedFilter}))
        dispatch(getUsers(1, pageSize, parsedFilter))
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendForm }}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})


export default UsersSearchForm