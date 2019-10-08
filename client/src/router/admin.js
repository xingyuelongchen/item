
export default [
    {
        path: 'home',
        title: '管理仪表板',
        icon: 'icon-home',
        role: 1,
        meta: { requiresAuth: true, isBack: false },
        // meta: { 
        //  requiresAuth: true, 判断是否登陆才可访问
        // },
        component: () => import('@/views/admin/home/index.vue')
    },
    {
        path: 'user',
        title: '用户管理',
        icon: 'icon-user',
        role: 1, meta: {
            requiresAuth: true,
        },
        component: () => import('@/views/admin/user/index.vue'),
        children: [
            {
                path: 'user',
                title: '用户管理',
                icon: 'icon-user',
                role: 1,
                meta: {
                    requiresAuth: true,
                },
                component: () => import('@/views/admin/user/user.vue'),
            }
        ]
    }
]