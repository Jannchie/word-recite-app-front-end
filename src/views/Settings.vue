<template>
  <v-container>
    <v-row>
      <v-col>
        <w-card>
          <v-card-title>设置</v-card-title>
          <v-list>
            <v-list-item-content>
              <v-list-item>
                <v-list-item-avatar
                  ><v-icon>mdi-weather-night</v-icon></v-list-item-avatar
                >
                <v-list-item-title>
                  夜间模式
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-col cols="auto" class="pr-0">
                  <v-list-item-title>
                    <v-switch
                      class="pr-2 pl-3"
                      color="primary"
                      v-model="settings.dark"
                    ></v-switch>
                  </v-list-item-title>
                </v-col>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar
                  ><v-icon>
                    mdi-speaker-wireless
                  </v-icon></v-list-item-avatar
                >
                <v-list-item-title>
                  自动朗读
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-col cols="auto" class="pr-0">
                  <v-list-item-title>
                    <v-switch
                      class="pr-2 pl-3"
                      color="primary"
                      v-model="settings.autoPlayAudio"
                    ></v-switch>
                  </v-list-item-title>
                </v-col>
              </v-list-item>

              <v-list-item>
                <v-list-item-avatar
                  ><v-icon> mdi-format-list-checks </v-icon></v-list-item-avatar
                >

                <v-list-item-title>
                  每轮背诵个数
                </v-list-item-title>
                <v-spacer></v-spacer>
                <v-list-item-title>
                  <v-autocomplete
                    no-data-text="超出范围"
                    :v-model="settings.wordsOfRound"
                    :value="settings.wordsOfRound"
                    :items="wordsOfRoundItems"
                    >{{ settings.wordsOfRound }}</v-autocomplete
                  >
                </v-list-item-title>
              </v-list-item>
            </v-list-item-content>
          </v-list>
        </w-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import data from "../data";
export default {
  data: function() {
    return {
      settings: data.settings,
      wordsOfRoundItems: (function() {
        let array = [{ text: "无限", value: -1 }];
        for (let index = 1; index <= 100; index++) {
          array.push(index);
        }
        return array;
      })()
    };
  }
};
</script>
