'use strict'

/**
 * グレード１の問題データ
 */
export class Grade1 {

	/**
	 * コンストラクタの無効化
	 */
	constructor() {
	}

	static Q = new Array(
		{word: "bag", mean: "カバン"},
		{word: "notebook", mean: "ノートブック"},
		{word: "desk", mean: "机"},
		{word: "table", mean: "テーブル"},
		{word: "homework", mean: "宿題"},
		{word: "diary", mean: "日記"},
		{word: "piano", mean: "ピアノ"},
		{word: "hand", mean: "手"},
		{word: "rose", mean: "バラ"},
		{word: "chair", mean: "いす"},
		{word: "bat", mean: "バット"},
		{word: "fish", mean: "魚"},
		{word: "dog", mean: "犬"},
		{word: "watch", mean: "腕時計"},
		{word: "mitt", mean: "ミット"},
		{word: "milk", mean: "牛乳"},
		{word: "flower", mean: "花"},
		{word: "door", mean: "ドア"},
		{word: "egg", mean: "卵"},
		{word: "boat", mean: "ボート"},
		{word: "orange", mean: "オレンジ"},
		{word: "bird", mean: "鳥"},
		{word: "sheep", mean: "羊"},
		{word: "cup", mean: "カップ"},
		{word: "bus", mean: "バス"},
		{word: "apple", mean: "りんご"},
		{word: "fruit", mean: "果物"},
		{word: "car", mean: "自動車"},
		{word: "cake", mean: "ケーキ"},
		{word: "picture", mean: "絵，写真"},
		{word: "cat", mean: "猫"},
		{word: "stamp", mean: "切手"},
		{word: "plane", mean: "飛行機"},
		{word: "book", mean: "本"},
		{word: "racket", mean: "ラケット"},
		{word: "glass", mean: "コップ，ガラス"},
		{word: "bed", mean: "ベッド"},
		{word: "letter", mean: "手紙"},
		{word: "tape", mean: "テープ"},
		{word: "cap", mean: "帽子"},
		{word: "mail", mean: "郵便"},
		{word: "box", mean: "箱"},
		{word: "doll", mean: "人形"},
		{word: "tree", mean: "木"},
		{word: "pen", mean: "（ボール）ペン"},
		{word: "map", mean: "地図"},
		{word: "cow", mean: "うし"},
		{word: "pot", mean: "ポット"},
		{word: "camera", mean: "カメラ"},
		{word: "lemon", mean: "レモン"},
		{word: "bread", mean: "パン"},
		{word: "girl", mean: "少女"},
		{word: "man", mean: "男の人、人"},
		{word: "woman", mean: "女性"},
		{word: "father", mean: "父"},
		{word: "mother", mean: "母"},
		{word: "brother", mean: "兄弟"},
		{word: "sister", mean: "姉妹"},
		{word: "doctor", mean: "医者"},
		{word: "pilot", mean: "パイロット"},
		{word: "cook", mean: "料理人"},
		{word: "parents", mean: "両親"},
		{word: "uncle", mean: "おじ"},
		{word: "aunt", mean: "おば"},
		{word: "boy", mean: "少年"},
		{word: "son", mean: "息子"},
		{word: "nurse", mean: "看護婦"},
		{word: "friend", mean: "友人"},
		{word: "student", mean: "学生"},
		{word: "clerk", mean: "店員"},
		{word: "family", mean: "家族"},
		{word: "teacher", mean: "先生"},
		{word: "player", mean: "選手，演奏者"},
		{word: "singer", mean: "歌手"},
		{word: "daughter", mean: "娘"},
		{word: "city", mean: "市，都会"},
		{word: "window", mean: "窓"},
		{word: "church", mean: "教会"},
		{word: "school", mean: "学校"},
		{word: "yard", mean: "中庭"},
		{word: "bank", mean: "銀行，土手"},
		{word: "library", mean: "図書館"},
		{word: "hospital", mean: "病院"},
		{word: "hotel", mean: "ホテル"},
		{word: "village", mean: "町、村"},
		{word: "kitchen", mean: "台所"},
		{word: "wall", mean: "壁"},
		{word: "park", mean: "公園"},
		{word: "country", mean: "国，いなか，地方"},
		{word: "office", mean: "事務所"},
		{word: "garden", mean: "庭"},
		{word: "town", mean: "街、町"},
		{word: "citizen", mean: "市民"},
		{word: "floor", mean: "床，階"},
		{word: "store", mean: "店"},
		{word: "station", mean: "駅"},
		{word: "house", mean: "家"},
		{word: "field", mean: "野原，競技場"},
		{word: "Japan", mean: "日本"},
		{word: "gate", mean: "門"},
		{word: "room", mean: "部屋"},
		{word: "walk", mean: "散歩"},
		{word: "work", mean: "仕事，作品"},
		{word: "basketball", mean: "バスケットボール"},
		{word: "baseball", mean: "野球"},
		{word: "tennis", mean: "テニス"},
		{word: "present", mean: "プレゼント"},
		{word: "way", mean: "道，方法"},
		{word: "chance", mean: "機会"},
		{word: "thing", mean: "こと・物"},
		{word: "word", mean: "名前"},
		{word: "science", mean: "科学"},
		{word: "subject", mean: "科目，題目"},
		{word: "color", mean: "色"},
		{word: "line", mean: "線，列"},
		{word: "place", mean: "場所"},
		{word: "like", mean: "好む"},
		{word: "look", mean: "見る，"},
		{word: "look", mean: "～に見える"},
		{word: "read", mean: "読む"},
		{word: "drink", mean: "飲む"},
		{word: "walk", mean: "歩く"},
		{word: "wash", mean: "洗う"},
		{word: "run", mean: "走る"},
		{word: "stop", mean: "止める，"},
		{word: "stop", mean: "止まる"},
		{word: "have", mean: "持っている"},
		{word: "have", mean: "食べる"},
		{word: "wait", mean: "待つ"},
		{word: "collect", mean: "集める"},
		{word: "send", mean: "送る"},
		{word: "come", mean: "来る"},
		{word: "want", mean: "欲しい"},
		{word: "do", mean: "する"},
		{word: "make", mean: "作る，～を～にする"},
		{word: "ride", mean: "乗る"},
		{word: "enjoy", mean: "楽しむ"},
		{word: "play", mean: "遊ぶ"},
		{word: "play", mean: "(スポーツを)をする"},
		{word: "play", mean: "演奏する"},
		{word: "sing", mean: "歌う"},
		{word: "speak", mean: "話す"},
		{word: "cook", mean: "料理する"},
		{word: "swim", mean: "泳ぐ"},
		{word: "write", mean: "書く，手紙を書く"},
		{word: "catch", mean: "捕まえる，"},
		{word: "catch", mean: "(列車に)間に合う"},
		{word: "open", mean: "開ける"},
		{word: "move", mean: "動く，"},
		{word: "move", mean: "感動させる"},
		{word: "help", mean: "助ける"},
		{word: "buy", mean: "買う"},
		{word: "leave", mean: "去る，残す，置いて行く"},
		{word: "meet", mean: "会う"},
		{word: "live", mean: "住む，生きる"},
		{word: "work", mean: "働く"},
		{word: "go", mean: "行く"},
		{word: "know", mean: "知っている"},
		{word: "study", mean: "勉強する"},
		{word: "eat", mean: "食べる"},
		{word: "learn", mean: "学ぶ，覚える"},
		{word: "stand", mean: "立つ"},
		{word: "dance", mean: "おどる"},
		{word: "sell", mean: "売る"},
		{word: "arrive", mean: "到着する"},
		{word: "get", mean: "得る，着く，乗る"},
		{word: "put", mean: "置く"},
		{word: "stay", mean: "滞在する"},
		{word: "try", mean: "試す"},
		{word: "give", mean: "与える，(会などを)開く"},
		{word: "use", mean: "使う"},
		{word: "visit", mean: "訪問する"},
		{word: "need", mean: "必要とする"},
		{word: "happy", mean: "幸福な"},
		{word: "happy", mean: "楽しい"},
		{word: "busy", mean: "忙しい"},
		{word: "sorry", mean: "ごめんなさい、残念な"},
		{word: "honest", mean: "正直な"},
		{word: "poor", mean: "貧乏な，かわいそうな"},
		{word: "poor", mean: "不十分な"},
		{word: "later", mean: "後で"},
		{word: "soon", mean: "すぐに"},
		{word: "yesterday", mean: "昨日"},
		{word: "clock", mean: "～時"},
		{word: "already", mean: "すでに"},
		{word: "up", mean: "上へ"},
		{word: "there", mean: "そこに"},
		{word: "well", mean: "よく，じょうずに"},
		{word: "so", mean: "そんなに"},
		{word: "slowly", mean: "ゆっくりと"},
		{word: "yet", mean: "まだ"},
		{word: "yet", mean: "(～でない)"},
		{word: "why", mean: "なぜ"},
		{word: "best", mean: "一番良い"},
		{word: "bad", mean: "悪い"},
		{word: "clean", mean: "きれいな"},
		{word: "fast", mean: "速い"},
		{word: "large", mean: "大きい，広い"},
		{word: "easy", mean: "やさしい，気楽に"},
		{word: "tall", mean: "背の高い"},
		{word: "some", mean: "いくつかの"},
		{word: "early", mean: "早い"},
		{word: "this", mean: "この"},
		{word: "those", mean: "あれらの"},
		{word: "warm", mean: "温暖な"},
		{word: "cool", mean: "涼しい"},
		{word: "new", mean: "新しい"},
		{word: "short", mean: "短い，背が低い"},
		{word: "little", mean: "小さい，幼い，ちょっとした"},
		{word: "dark", mean: "暗い，黒い"},
		{word: "old", mean: "年をとった，古い"},
		{word: "careful", mean: "注意深い"},
		{word: "junior", mean: "年下の，"},
		{word: "junior", mean: "下級の"},
		{word: "hungry", mean: "空腹の"},
		{word: "ill", mean: "病気の"},
		{word: "usually", mean: "ふつう"},
		{word: "today", mean: "今日，現在"},
		{word: "fast", mean: "速く"},
		{word: "now", mean: "今"},
		{word: "ago", mean: "前"},
		{word: "where", mean: "どこに"},
		{word: "home", mean: "家を(へ)"},
		{word: "much", mean: "ずっと，たいへん"},
		{word: "yes", mean: "はい"},
		{word: "also", mean: "もまた"},
		{word: "not", mean: "～でない"},
		{word: "together", mean: "一緒に"},
		{word: "sick", mean: "病気で(の)"},
		{word: "kind", mean: "親切な"},
		{word: "glad", mean: "うれしい"},
		{word: "good", mean: "良い"},
		{word: "young", mean: "若い"},
		{word: "sometimes", mean: "時々"},
		{word: "often", mean: "しばしば"},
		{word: "early", mean: "早く"},
		{word: "always", mean: "いつも"},
		{word: "again", mean: "再び"},
		{word: "far", mean: "遠くに，はるかに"},
		{word: "here", mean: "ここに"},
		{word: "very", mean: "非常に"},
		{word: "how", mean: "どのくらい"},
		{word: "too", mean: "～もまた，"},
		{word: "too", mean: "～すぎる"},
		{word: "no", mean: "いいえ"},
		{word: "beautiful", mean: "美しい"},
		{word: "next", mean: "次の，隣の"},
		{word: "long", mean: "長い"},
		{word: "rich", mean: "金持ちの，"},
		{word: "rich", mean: "豊かな"},
		{word: "able", mean: "できる，"},
		{word: "able", mean: "有能な"},
		{word: "hot", mean: "暑い"},
		{word: "small", mean: "小さな"},
		{word: "white", mean: "白い"},
		{word: "black", mean: "黒い"},
		{word: "true", mean: "ほんとうの"},
		{word: "many", mean: "多量の"},
		{word: "every", mean: "毎～"},
		{word: "many", mean: "多くの"},
		{word: "cold", mean: "冷たい，寒い"},
		{word: "famous", mean: "有名な"},
		{word: "blue", mean: "青い"},
		{word: "sad", mean: "悲しい"},
		{word: "high", mean: "高い"},
		{word: "slow", mean: "遅い"},
		{word: "nice", mean: "良い"},
		{word: "these", mean: "これらの"},
		{word: "all", mean: "すべての"},
		{word: "that", mean: "あの"},
		{word: "red", mean: "赤い"},
		{word: "green", mean: "緑の"},
		{word: "strong", mean: "強い，じょうぶな"},
		{word: "big", mean: "大きい"},
		{word: "fine", mean: "すばらしい，"},
		{word: "fine", mean: "元気な，晴れた"},
		{word: "evening", mean: "晩"},
		{word: "morning", mean: "朝"},
		{word: "night", mean: "夜"},
		{word: "noon", mean: "正午"},
		{word: "tomorrow", mean: "明日"},
		{word: "time", mean: "時，～回"},
		{word: "afternoon", mean: "午後"},
		{word: "meal", mean: "食事"},
		{word: "breakfast", mean: "朝食"},
		{word: "lunch", mean: "昼食"},
		{word: "dinner", mean: "夕食"},
		{word: "supper", mean: "夕食"},
		{word: "season", mean: "季節"},
		{word: "spring", mean: "春"},
		{word: "summer", mean: "夏"},
		{word: "autumn", mean: "秋"},
		{word: "fall", mean: "秋"},
		{word: "winter", mean: "冬"},
		{word: "minute", mean: "分"},
		{word: "minute", mean: "ちょっとの間"},
		{word: "week", mean: "週"},
		{word: "month", mean: "月"},
		{word: "year", mean: "年"},
		{word: "hour", mean: "時間"},
		{word: "day", mean: "日"}
	);
}