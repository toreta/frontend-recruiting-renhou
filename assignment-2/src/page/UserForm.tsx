import { ChangeEvent } from 'react'
import { useUserForm } from '../script/useUserForm'
import { prefectures } from '../script/prefectures'

const UserForm = () => {
  // ----- use hooks -----
  const { values, setValues, handleSubmit, errors } = useUserForm()

  //  ----- function -----
  // インプット処理
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  //  ----- variable abbreviations -----
  const isSaveButtonDisabled: boolean =
    !values.name || !values.email || !values.zip || !values.prefecture || !values.address1

  return (
    <section className='flex h-screen w-screen flex-row items-center justify-center bg-gray-100 text-sm font-bold text-slate-800'>
      <div className='flex w-2/6 flex-col rounded-md bg-white p-10 shadow-sm'>
        <h1 className='my-5 text-center text-xl font-bold'>ユーザーフォーム</h1>

        <form className='flex flex-col' onSubmit={(e) => e.preventDefault()}>
          {/* 氏名 */}
          <label className='input-lable'>
            <div className='input-title'>氏名</div>

            <div className='w-4/5'>
              <input
                className={`input ${errors.name && 'border-red-500'}`}
                type='text'
                name='name'
                placeholder='（例）トレタ'
                value={values.name}
                required
                onChange={handleChange}
              />
              <div className='mb-2 w-full text-sm text-red-500'>{errors.name}</div>
            </div>
          </label>

          {/* Eメール */}
          <label className='input-lable'>
            <div className='input-title'>Eメール</div>

            <div className='w-4/5'>
              <input
                className={`input ${errors.email && 'border-red-500'}`}
                type='email'
                name='email'
                placeholder='（例）test@qq.com'
                value={values.email}
                required
                onChange={handleChange}
              />

              <div className='mb-2 text-sm text-red-500'>{errors.email}</div>
            </div>
          </label>

          {/* 郵便番号 */}
          <label className='input-lable'>
            <div className='input-title'>郵便番号</div>

            <div className='w-4/5'>
              <input
                className={`input max-w-fit ${errors.zip && 'border-red-500'}`}
                type='text'
                name='zip'
                placeholder='（例）000000'
                maxLength={7}
                required
                value={values.zip}
                onChange={handleChange}
              />
              <div className='mb-2 text-sm text-red-500'>{errors.zip}</div>
            </div>
          </label>

          {/* 都道府県 */}
          <label className='input-lable'>
            <div className='input-title'>都道府県</div>

            <div className='w-4/5'>
              <select
                className={`input ${errors.prefecture && 'border-red-500'}`}
                name='prefecture'
                value={values.prefecture}
                required
                onChange={handleChange}
              >
                <option value=''>選択してください</option>
                {prefectures.map((i: string) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className='mb-2 text-sm text-red-500'>{errors.prefecture}</div>
            </div>
          </label>

          {/* 住所 */}
          <label className='input-lable'>
            <div className='input-title'>住所</div>

            <div className='w-4/5'>
              <input
                className={`input ${errors.address1 && 'border-red-500'}`}
                type='text'
                name='address1'
                placeholder='（例）五反田'
                value={values.address1}
                onChange={handleChange}
              />
              <div className='mb-2 text-sm text-red-500'>{errors.address1}</div>
            </div>
          </label>

          <label className='input-lable'>
            <div className='input-title'>建物名・号室</div>
            <input
              className='input w-4/5'
              type='text'
              name='address2'
              placeholder='（例）TOC'
              value={values.address2}
              onChange={handleChange}
            />
          </label>

          <div className='mt-5 flex flex-row items-center justify-center'>
            <button
              className={`w-24 rounded-md ${
                isSaveButtonDisabled ? 'bg-green-200' : 'bg-green-400'
              } p-3 text-white shadow-sm hover:bg-green-200`}
              type='button'
              onClick={handleSubmit}
              disabled={isSaveButtonDisabled}
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UserForm
