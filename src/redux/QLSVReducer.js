let qlsv = {
    mangSV: [
        { maSV: 'SV001', hoTen: 'Nguyễn Văn A', sdt: '0905123123', email: 'test@gmail.com' },
        { maSV: 'SV002', hoTen: 'Nguyễn Thị Bê', sdt: '0905123123', email: 'test@gmail.com' },
        { maSV: 'SV003', hoTen: 'Lê Văn Cê', sdt: '0905123123', email: 'test@gmail.com' },
    ],

    // thongTinSV: { maSV: 'user123', hoTen: 'Nguyễn Văn A', sdt: '0905123123', email: 'test@gmail.com' },
    sinhVien: {
        values: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: '',
        },
        errors: {
            maSV: '',
            hoTen: '',
            sdt: '',
            email: '',
        }
    },
    mangSVSearch: []
}

export const qlsvReducer = (state = qlsv, action) => {
    switch (action.type) {
        case 'HANDLE_INPUT':
            state.sinhVien = action.sinhVien
            state.sinhVien = { ...state.sinhVien }
            return { ...state };

        case 'THEM_NGUOI_DUNG':
            for (let item in action.sinhVien) {
                if (action.sinhVien[item] == '') {
                    alert("Các trường thông tin không được để trống")
                    return { ...state };
                }
            }
            let isValid = true;
            state.mangSV.map(sv => {
                if (sv.maSV == action.sinhVien.maSV) {
                    return isValid = false;
                }
            })

            if (!isValid) {
                alert("MaSV không được trùng")
                return { ...state };
            }

            state.mangSV = [...state.mangSV, action.sinhVien];
            return { ...state };

        case 'CAP_NHAT':
            let mangCapNhat = [...state.mangSV]
            // tìm người dùng cần cập nhật trong mảng
            let svCapNhat = mangCapNhat.find((sv) => {
                return sv.maSV === action.capNhatSV.maSV
            })

            for (let item in state.sinhVien.errors) {
                if (state.sinhVien.errors[item] !== '') {
                    alert("Lỗi")
                    return { ...state };
                }
            }
            // Do kết quả từ find không gán trực tiếp được giá trị mới
            if (svCapNhat) {
                svCapNhat.hoTen = action.capNhatSV.hoTen;
                svCapNhat.sdt = action.capNhatSV.sdt;
                svCapNhat.email = action.capNhatSV.email;
            }
            state.mangSV = mangCapNhat;
            return { ...state }

        case 'XOA_SINH_VIEN':
            let mangSVXoa = [...state.mangSV]
            state.mangSV = mangSVXoa.filter((sv) => {
                return sv.maSV !== action.sinhVienXoa
            })
            return { ...state }

        case 'XEM_THONG_TIN':
            state.sinhVien.values = action.thongTinSV
            state.sinhVien = { ...state.sinhVien }
            return { ...state }
        case 'HANDLE_SEARCH':
            state.mangSVSearch = action.search
            return { ...state }
        default: return state;
    }
}