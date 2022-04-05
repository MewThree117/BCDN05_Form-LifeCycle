import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'

export function FormDK(props) {
    const dispatch = useDispatch()
    let sinhVien = useSelector((state) => {
        return state.qlsvReducer.sinhVien
    })
    let { values, errors } = sinhVien
    let newValues = { ...values }

    const handleInput = (e) => {
        // value input
        let { value, name } = e.target
        newValues[name] = value;

        // errors
        let newErrors = { ...errors }
        let message = ''
        if (value.trim() == '') {
            message = name + 'không được để trống'
        }

        let attValue = e.target.getAttribute("data-type");
        let reg = '';
        // kiểm tra email
        if (attValue === 'email') {
            reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!reg.test(value)) {
                message = name + ' không đúng định dạng'
            }
        }

        if (e.target.name === 'sdt') {
            reg = /^[0-9]+$/;
            if (!reg.test(value)) {
                message = name + ' không đúng định dạng'
            }
        }

        newErrors[name] = message

        let action = {
            type: 'HANDLE_INPUT',
            sinhVien: {
                values: newValues,
                errors: newErrors
            }
        }
        dispatch(action);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;
        for (let index in errors) {
            if (errors[index] !== '') {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            alert('Lỗi')
            return
        }

        let action = {
            type: 'THEM_NGUOI_DUNG',
            sinhVien: newValues
        }
        dispatch(action)
    }


    return (
        <div className="card mt-5">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="card-header bg-dark text-white">
                    <div>Form Đăng Ký</div>
                </div>
                <div className="card-body">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Mã sinh viên</label>
                            <input onChange={(e) => handleInput(e)} type="text" name='maSV' value={values.maSV} className="form-control" />
                            <p className='text-danger'>{errors.maSV}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Họ tên</label>
                            <input onChange={(e) => handleInput(e)} type="text" name='hoTen' value={values.hoTen} className="form-control" />
                            <p className='text-danger'>{errors.hoTen}</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Số điện thoại</label>
                            <input onChange={(e) => handleInput(e)} type="text" name='sdt' value={values.sdt} className="form-control" />
                            <p className='text-danger'>{errors.sdt}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input onChange={(e) => handleInput(e)} data-type='email' type="email" value={values.email} name='email' className="form-control" />
                            <p className='text-danger'>{errors.email}</p>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-success mr-3'>Thêm Sinh Viên</button>
                        <button className='btn btn-primary' type='button' onClick={() => {
                            let action = {
                                type: 'CAP_NHAT',
                                capNhatSV: newValues
                            }
                            dispatch(action);
                        }}>Cập Nhật</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (rootReducer) => {
    return {
        sinhVien: rootReducer.qlsvReducer.sinhVien
    }
}
export default connect(mapStateToProps)(FormDK)