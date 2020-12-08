import request from '@/utils/request';

export async function queryProductCategory(params) {
    return request('/api/category', {
        params,
    });
}

export async function deleteCategory(id) {
    return request(`/api/category/${id}`, {
        method: 'DELETE',
    });
}

export async function updateCategory(id, params) {
    return request(`/api/category/${id}`, {
        method: 'PUT',
        data: {...params},
    });
}

export async function addCategory(params) {
    return request(`/api/category`, {
        method: 'POST',
        data: {
            ...params,
            parentId: 0,
        },
    });
}
