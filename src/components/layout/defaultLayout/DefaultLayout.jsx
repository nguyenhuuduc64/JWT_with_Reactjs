import Main from '../main/Main';
import Sidebar from '../sidebar/Sidebar';
import Header from './../header/Header';

import styles from './defaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function DefautLayout({ children }) {
    return (
        <div>
            <Header />
            <Main>
                <Sidebar />
                {children}
            </Main>
        </div>
    );
}
export default DefautLayout;
