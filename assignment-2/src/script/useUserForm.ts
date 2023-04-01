// * ------------------------------
// *
// * useUserForm.ts
// *
// * ------------------------------

import type { IUserFormValues, IValidationResult } from '../types'
import { useState } from 'react'

const valuePrototype = {
  name: '',
  email: '',
  zip: '',
  prefecture: '',
  address1: '',
  address2: '',
}

export const useUserForm = () => {
  // ----- state -----
  const [values, setValues] = useState<IUserFormValues>(valuePrototype)
  const [errors, setErrors] = useState(valuePrototype)

  //  ----- function -----
  // フォーム確認
  const validate = (): IValidationResult => {
    const newErrors = {
      name: '',
      email: '',
      zip: '',
      prefecture: '',
      address1: '',
      address2: '',
    }

    if (!values.name) {
      newErrors.name = '氏名は必須です'
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!values.email || !emailRegex.test(values.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    const zipRegex = /^\d{7}$/
    if (!values.zip || !zipRegex.test(values.zip)) {
      newErrors.zip = '有効な郵便番号を入力してください'
    }

    if (!values.prefecture) {
      newErrors.prefecture = '都道府県を選択してください'
    }

    if (!values.address1) {
      newErrors.address1 = '市区町村・番地は必須です'
    }

    setErrors(newErrors)
    const isValid = Object.keys(errors).length === 0
    return { isValid, errors: newErrors }
  }

  // 確認処理
  const handleSubmit = async (): Promise<void> => {
    const validationResult = validate()
    if (!validationResult.isValid) {
      return
    }

    setErrors(valuePrototype)
    await fetch('https://httpstat.us/201', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          alert('送信が完了しました')
        } else {
          alert('送信に失敗しました: ' + response.statusText)
        }
      })
      .catch((error) => {
        alert('送信に失敗しました: ' + error.message)
      })
  }

  return { values, setValues, handleSubmit, errors }
}
