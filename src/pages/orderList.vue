<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(item,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span>
                {{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(good,i) in item.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="good.productImage" alt />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{good.productName}}</div>
                    <div class="p-money">{{good.currentUnitPrice}} X {{good.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.status==20">
                <!-- <div class="p-status">{{item.statusDesc}}</div> -->
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <!-- <div class="p-status">{{item.statusDesc}}</div> -->
                <a href="javascript:;" @click="goPay(item.orderNo)">{{item.statusDesc}} 去付款</a>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination"
            v-if="true"
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next, total"
            :page-size="pageSize"
            :total="total"
          ></el-pagination>
          <div class="load-more" v-if="false" v-show="showNextPage">
            <el-button type="primary" :loading="pageLoading" @click="loadMore">加载更多</el-button>
          </div>
          <div
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="410"
            v-if="false"
          >
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt v-show="loading" />
          </div>
          <no-data v-if="!loading  && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from "./../components/OrderHeader";
import loading from "./../components/loading";
import NoData from "./../components/NoData";
import { Pagination, Button } from "element-ui";
import infiniteScroll from "vue-infinite-scroll";

export default {
  name: "order-list",
  components: {
    OrderHeader,
    loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]: Button
  },
  directives: {
    infiniteScroll
  },
  data() {
    return {
      list: [],
      loading: true,
      pageLoading: false,
      pageSize: 2,
      pageNum: 1,
      total: 0,
      busy: false, // 滚动加载是否生效,
      showNextPage: true // 记载更多， 是否显示按钮
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.loading = false;
          this.list = res.list;
          this.total = res.total;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getMoreOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.loading = false;
          // this.list = res.list;
          this.list = this.list.concat(res.list);
          this.total = res.total;
          this.showNextPage = res.hasNextPage;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goPay(orderNo) {
      // this.$router.push('/order/list')
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo
        }
      });
    },
    // 分页器
    handleCurrentChange(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.getOrderList();
    },
    // 加载更多按钮
    loadMore() {
      this.pageNum++;
      this.getOrderList();
    },
    // 滚动加载
    scrollMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++;
        this.getMoreOrderList();
      }, 500);
    },
    // 专门测试滚动加载
    getList() {
      this.loading = true;
      this.axios
        .get("/orders", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.list = this.list.concat(res.list);
          this.loading = false;
          if (res.hasNextPage) {
            this.busy = false;
          } else {
            this.busy = true;
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>