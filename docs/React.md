## レンダリング

- CSR

## CSS Module

- 原則コンポーネントはMaterial UIを使用する。
- スタイルもMaterial UI標準を使用する。
- ただTailwindCSSに置き換えていく。
- アイコンreact-icons利用する

## Context API vs Redux Toolkit

- 大規模業務アプリケーション+API処理をReduxに集約させたいためRedux Toolkitを使用する

## Redux Toolkit

- 業務ドメインごとに作成していく 例: productSlice.ts

### createAction

### createSlice

```typescript
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { removeUser } from '../thunks/removeUser'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        data: [],
        error: null,
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })

        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })

        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter((user) => {
                return user.id !== action.payload.id;
            })
        })
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
})
```

### コンポーネント側の呼び出し
```typescript
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../src/lib/stores'

// hooksに移動
function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg)).unwrap().catch(err => setError(err)).finally(() => setIsLoading(false));
    }, [dispatch, thunk]);

    return [runThunk, isLoading, error];
}

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
    
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser)

    const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser)
    
    const dispatch = useDispatch();
    const { data } = useSelector((state) => {
        return state.users;
    });

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers])

    // テンプレート側でisCreatingUserの時はLoadingコンポーネントを表示 
    // ボタン押せないようする 二重防止送信 BEでToken送信
    // エラーの場合はトースター
    const addUser = () => {
        doCreateUser();
    };

    let content;
    if (isLoadingUsers) {
        content = <Skeleton />
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div> // 本来はトースター
    } else {
        // Atomic designによってコンポーネントを作成すべき
        content = data.map((user) => {
            return (
                <div key={user.id}>
                    <div>
                        {user.name}
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div>
                <h1>Users</h1>
                <Button loading={isCreatingUser} onClick={addUser}>+ Add Users</Button>
                {creatingUserError && 'Error creating user...'}
            </div>
            {content}
        </div>
    )
}


import { useFetchAlbumsQuery } from '../src/lib/store.ts'
function AlbumsList({ user }) {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    /** 上記のオブジェクト
        data: APIデータ取得
        error: エラー発生した場合
        isLoading: 最初のAPI取得時のみ使用
        isFetching: データフェッチ時
        refetch: 再フェッチ
     */
    return <div>Albums for {user.name} </div>;
}
export default AlbumsList;
```

## Hooks

- [hooks参照](../src/utils/hooks.ts)

## Context

## API層

- Redux Toolkit Query APIを利用する
- CRUD操作はAPIフォルダに業務ドメインごとにファイルを生成 例: product.ts
- ReduxのextraReducersにCRUD操作の定義を行う
- useSWRを利用するのは良い判断か調査

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (user) => {
    const response = await aixos.delete(`https://localhost:3000/users/${user.id}`)

    response.data;
});
```

`Redux Toolkit Query API`
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                invalidatesTags: ['Album'],
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        }
                    }
                }
            })
            fetchAlbums: builder.query({
                providesTags: ['Album'],
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                },
            });
        }
    }
})

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
```

`store設定`
```typescript
export const store = configureStore({
    reducer: {
        users: usersReducer,
        [alnumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(albumsApi.middleware);
    }
})
```

## Headeless UI調査
## Store 調査
## CSS Module調査
## ディレクトリ構造 調査