import React, { useState } from 'react'
import { useSelector, useDispatch, } from 'react-redux'

export default function TableSV() {

    const [isSearch, setIsSearch] = useState(true);
    const dispatch = useDispatch();
    const { mangSV, mangSVSearch } = useSelector((state) => {
        return state.qlsvReducer
    })

    const renderTable = (mang) => {
        let count = 1;
        return mang.map((sv, index) => {
            return <tr key={sv.maSV}>
                <td>{count++}</td>
                <td>{sv.maSV}</td>
                <td>{sv.hoTen}</td>
                <td>{sv.sdt}</td>
                <td>{sv.email}</td>
                <td>
                    <button className='btn btn-danger mr-2' onClick={() => {
                        let action = {
                            type: 'XOA_SINH_VIEN',
                            sinhVienXoa: sv.maSV
                        }
                        dispatch(action)
                    }}>Xóa</button>
                    <button className='btn btn-info' onClick={() => {
                        let action = {
                            type: 'XEM_THONG_TIN',
                            thongTinSV: sv
                        }
                        dispatch(action)
                    }}>Xem</button>
                </td>
            </tr>
        })
    }

    const handleSearch = (e) => {
        let mangSearch = [...mangSV]
        let { value } = e.target
        let searchValue = value.toLowerCase()
        mangSearch = mangSV.filter((sv) => {
            sv = sv.hoTen.toLowerCase();
            return sv.indexOf(searchValue) > -1
        })
        setIsSearch(false)

        let action = {
            type: 'HANDLE_SEARCH',
            search: mangSearch
        }
        dispatch(action)

    }

    return (
        <div className='card mt-5'>
            <div className="card-header bg-dark text-white d-flex justify-content-between">
                <div>Danh sách sinh viên</div>
                <input onChange={(e) => handleSearch(e)} type="text" name='search' placeholder="Search" id="" />
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mã SV</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">SĐT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSearch ? renderTable(mangSV) : renderTable(mangSVSearch)}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
