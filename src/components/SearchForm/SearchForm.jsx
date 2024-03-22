import { Field, Form, Formik } from "formik";
import toast from 'react-hot-toast';
import css from './SearchForm.module.css'

const SearchForm = ({ onSearchHandler }) => {

  return (
    <div className={css.searchBar}>
        <Formik
            initialValues={{ query: "" }}
            onSubmit={(values) => {
            const query = values.query.trim();
            if (!query) {
                toast.success('The search field must be filled in!', { iconTheme: { primary: '#713200', secondary: '#FFFAEE', }, });
                return;
            }
            onSearchHandler(values.query);
            //   values.query = '';
            }}
            >
            <Form>
                <div className={css.formField}>
                    <Field className={css.inputField} placeholder="Search movies" type="text" name="query" />
                    <button className={css.submitBtn} type="submit">Search</button>
                </div>
            </Form>
        </Formik>
    </div>
  )
}

export default SearchForm;