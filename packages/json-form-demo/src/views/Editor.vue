<template>
  <div class="about">
    <div class="input">
      <input v-model="formName" />
      <button @click="handleClick">保存表单</button>

      <select @change="handleChange">
        <option>请选择</option>
        <option v-for="formName in getFormNames()" :key="formName" :value="formName">{{formName}}</option>
      </select>

      <vue-json-editor v-model="jsonSchema" :expandedOnStart="true" @json-change="create" style="height: 100%;" />

    </div>
    <div class="show">
      <select v-model="mode">
        <option value="edit">edit</option>
        <option value="view">view</option>
      </select>

      <select v-model="type">
        <option value="web">web</option>
        <option value="h5">h5</option>
      </select>

      <h5-json-form v-if="type === 'h5' && status" v-model="formdata" ref="form" :formId="1" :mode="mode"
        :group="['en']" :formSchema="jsonSchema" />
      <web-json-form v-if="type === 'web' && status" v-model="formdata" ref="form" :formId="2" :mode="mode"
        :formSchema="jsonSchema" />

      <button type="button" class="btn btn-primary" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
export default {
  components: {
    vueJsonEditor
  },
  data () {
    return {
      type: 'web',
      mode: 'edit',
      status: true,
      schema: '',
      formdata: {},
      formName: '',
      jsonSchema4: {
        schema: {
          identityType: {
            type: 'string',
            title: '证明类型',
            enum: [
              'china_id_card',
              'street',
              'cn_household_register',
              'bank_statements',
              'utility_bill',
              'other'
            ],
            default: 'china_id_card',
            required: true
          },
          addressAttachment: {
            type: 'array',
            title: '证明文件',
            maxLength: 6,
            description: '1.请正面拍摄，避免照片变形、模糊、有遮挡\n2.资料仅用于上传审核\n3.支持jpg、pdf，6个文件以内',
            required: true
          },
          permanentAddress: {
            type: 'object',
            isTranslate: true,
            required: true
          },
          postalCode: {
            type: 'string',
            title: '邮编',
            maxLength: 100,
            required: true
          }
        },
        form: [
          {
            key: 'identityType',
            type: 'select',
            placeholder: '请选择',
            titleMap: {
              china_id_card: '身份证',
              street: '街道证明',
              cn_household_register: '户口簿',
              bank_statements: '银行账单',
              utility_bill: '水电煤账单',
              other: '其他证明'
            }
          },
          {
            key: 'addressAttachment',
            type: 'upload'
          },
          {
            key: 'permanentAddress',
            type: 'address',
            placeholder: '请完善'
          },
          {
            key: 'postalCode',
            type: 'input',
            mode: 'view',
            placeholder: '请输入'
          }
        ]
      },
      formSchema: {
        'schema': {
          'question1': {
            'type': 'Object',
            'title': '您是否在任何(上市)公司内担任高级人员或董事，而该公司的股份乃于任何交易所或市场买卖？如是，请说明公司名称，交易所及交易编号',
            'properties': {
              'answer': {
                'type': 'String'
              },
              'answerDesc': {
                'type': 'String',
                'title': '详细说明'
              }
            }
          },
          'question2': {
            'type': 'Object',
            'title': '您是否是香港证券及期货事务监察委员会持牌或注册实体的雇员或代表，或是香港金融管理局的相关登记人士？',
            'properties': {
              'answer': {
                'type': 'String'
              },
              'answerDesc': {
                'type': 'String',
                'title': '持证号码'
              },
              'answerFile': {
                'type': 'String',
                'title': '书面同意文件（仅支持图片格式）'
              }
            }
          }
        },
        'form': [
          {
            'type': 'question',
            'key': 'question1',
            'options': [
              {
                'label': '是',
                'value': 'A',
                'next': 'items'
              },
              {
                'label': '否',
                'value': 'B'
              }
            ],
            'items': [
              {
                'key': 'answer',
                'type': 'radios'
              },
              {
                'type': 'textarea',
                'key': 'answerDesc',
                'placeholder': '请说明公司名称，交易所及交易编号'
              }
            ]
          },
          {
            'type': 'question',
            'key': 'question2',
            'options': [
              {
                'label': '是',
                'value': 'A',
                'next': 'items'
              },
              {
                'label': '否',
                'value': 'B'
              }
            ],
            'items': [
              {
                'key': 'answer',
                'type': 'checkboxes'
              },
              {
                'type': 'input',
                'key': 'answerDesc',
                'placeholder': '请输入您的持证号码'
              },
              {
                'type': 'upload',
                'key': 'answerFile'
              }
            ]
          }]
      },
      jsonSchema2: {
        'schema': {
          'question1': {
            'type': 'Object',
            'title': '您是否在任何(上市)公司内担任高级人员或董事，而该公司的股份乃于任何交易所或市场买卖？如是，请说明公司名称，交易所及交易编号',
            'properties': {
              'answer': {
                'type': 'String'
              },
              'answerDesc': {
                'type': 'String',
                'title': '详细说明'
              }
            }
          },
          'question2': {
            'type': 'Object',
            'title': '您是否是香港证券及期货事务监察委员会持牌或注册实体的雇员或代表，或是香港金融管理局的相关登记人士？',
            'properties': {
              'answer': {
                'type': 'String'
              },
              'answerDesc': {
                'type': 'String',
                'title': '持证号码'
              },
              'answerFile': {
                'type': 'String',
                'title': '书面同意文件（仅支持图片格式）'
              }
            }
          }
        },
        'form': [
          {
            'type': 'question',
            'key': 'question1',
            'options': [
              {
                'label': '是',
                'value': 'A',
                'next': 'items'
              },
              {
                'label': '否',
                'value': 'B'
              }
            ],
            'items': [
              {
                'key': 'answer',
                'type': 'radios'
              },
              {
                'type': 'textarea',
                'key': 'answerDesc',
                'placeholder': '请说明公司名称，交易所及交易编号'
              }
            ]
          },
          {
            'type': 'question',
            'key': 'question2',
            'options': [
              {
                'label': '是',
                'value': 'A',
                'next': 'items'
              },
              {
                'label': '否',
                'value': 'B'
              }
            ],
            'items': [
              {
                'key': 'answer',
                'type': 'checkboxes'
              },
              {
                'type': 'input',
                'key': 'answerDesc',
                'placeholder': '请输入您的持证号码'
              },
              {
                'type': 'upload',
                'key': 'answerFile'
              }
            ]
          }]
      },
      jsonSchema1: {
        'schema': {
          'salaryField': {
            'type': 'Object',
            'properties': {
              'checked': {
                'type': 'Boolean',
                'title': '工资/薪水'
              },
              'fixedAssetsField': {
                'type': 'String',
                'title': '固定资产',
                'description': '注：固定资产出售所得（需要明所出售固定资产的地址，出售日期及出售价格）'
              },
              'stockField': {
                'type': 'String',
                'title': '股票期权',
                'description': '注：固定资产出售所得（需要明所出售固定资产的地址，出售日期及出售价格）'
              }
            }
          }

        },
        'form': [
          {
            'type': 'fieldset-checkbox',
            'key': 'salaryField',
            'items': [
              {
                'type': 'checkbox',
                'key': 'checked'
              },
              {
                'type': 'textarea',
                'key': 'fixedAssetsField'
              },
              {
                'type': 'textarea',
                'key': 'stockField'
              }
            ]
          }
        ],
        'value': {
          'salaryField': {
            // "checked": true,
            // "fixedAssetsField": "12",
            // "stockField": "333"
          }
        }
      },
      jsonSchema: {
        schema: {
          name: {
            title: 'Default Name',
            description: 'Nickname allowed',
            type: 'string'
          },
          'checkboxField': {
            'type': 'array',
            'title': '多选框',
            'enum': ['option1', 'option2']
          },
          'phoneField': {
            'type': 'object',
            'title': '手机号码',
            'properties': {
              'area': {
                'type': 'string',
                'title': '区号',
                'enum': ['0086', '00852']
              },
              'phone': {
                'type': 'string',
                'title': '号码'
              }
            }
          }
        },
        form: [
          {
            'key': 'name',
            'type': 'input',
            required: true
          },
          {
            'key': 'checkboxField',
            'type': 'checkboxes',
            required: true,
            'titleMap': {
              'option1': '选项1',
              'option2': '选项2'
            }
          },
          {
            'type': 'phone',
            'key': 'phoneField',
            'items': [
              {
                'type': 'select',
                'key': 'area',
                'titleMap': {
                  '0086': '+86',
                  '00852': '+852'
                }
              },
              {
                'type': 'number',
                'key': 'phone'
              }
            ]
          }
        ],
        value: {
          name: '',
          checkboxField: [],
          'phoneField': {
            'area': '0086',
            'phone': ''
          }
        }
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.formdata = {
        permanentAddress: {
          CN: {
            address: '详细地址哦',
            area: '',
            city: '110100',
            country: '中国',
            province: '110000'
          },
          EN: {
            address: 'detail address',
            area: '',
            city: '110100',
            country: 'CHINA',
            province: '110000'
          }
        }
      }
      this.$refs['form'].clearValidate()
    }, 2000)
  },
  methods: {
    create () {
      this.status = false
      setTimeout(() => {
        this.status = true
      }, 200)
    },
    handleClick () {
      const formName = this.formName || new Date().toJSON()
      //
      console.log(formName, this.formSchema)
      //
      this.saveFormSchema(formName, this.formSchema)
    },
    handleChange (event) {
      //
      this.formSchema = this.getFormSchema(event.target.value)
    },
    saveFormSchema (formName, formSchema) {
      const formNamesMap = JSON.parse(localStorage.getItem('jsonform.formNames') || '{}')
      //
      formNamesMap[formName] = formName
      //
      localStorage.setItem('jsonform.formNames', JSON.stringify(formNamesMap))
      //
      localStorage.setItem(`jsonform.${formName}`, JSON.stringify(formSchema))
    },
    getFormNames () {
      const formNamesMap = JSON.parse(localStorage.getItem('jsonform.formNames') || '{}')
      return Object.keys(formNamesMap)
    },
    getFormSchema (formName) {
      console.log(`jsonform.${formName}`)
      console.log(localStorage.getItem(`jsonform.${formName}`))
      return JSON.parse(localStorage.getItem(`jsonform.${formName}`) || '{}')
    },
    async submit () {
      const validateStatus = await this.$refs['form'].validateForm()
      console.log('validateStatus', validateStatus)

      // if (true) {
      console.log('formdata', this.formdata)
      // }
    }
  }
}
</script>
<style lang="css">
.about {
  height: 100%;
  width: 100%;
  display: flex;
  font-size: 15px;
}
.md-cell-item-content {
  /* font-size: 15px !important; */
  min-width: 80px;
}
.input {
  width: 50%;
  padding: 40px;
}
.jsoneditor-vue {
  height: 100%;
}
textarea {
  height: 30%;
  width: 100%;
}
.show {
  width: 50%;
  text-align: center;
}
@media screen and (max-width: 500px) {
  .about {
    flex-direction: column;
  }
  .input,
  .show {
    width: 100%;
  }
}

.web-json-form {
  margin-top: 50px;
  padding: 0 20px;
}
</style>
