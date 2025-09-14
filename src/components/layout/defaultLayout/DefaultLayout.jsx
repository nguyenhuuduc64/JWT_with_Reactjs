import Main from '../main/Main';
import Sidebar from '../sidebar/Sidebar';
import Header from './../header/Header';

import styles from './defaultLayout.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function DefautLayout({ children, role }) {
    return (
        <div>
            <Header />
            <Main>
                <Sidebar role={role} />
                <div style={{ width: '100%' }}>{children}</div>
            </Main>
        </div>
    );
}
export default DefautLayout;
