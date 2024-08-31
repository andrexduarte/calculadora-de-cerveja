<template>
  <div>
    <header class="header">
      <h1 class="page-title">Calculadora de Cerveja</h1>
      <p class="page-desc">
        Descubra qual cerveja oferece o melhor custo-benefício no supermercado.
        Compare preços e encontre a opção mais econômica.
      </p>
    </header>

    <main class="main">
      <div class="content">
        <form>
          <fieldset v-for="(recipiente, index) in recipientes" :key="index">
            <legend>{{ recipiente.nome ? recipiente.nome : `Recipiente ${index + 1}` }}</legend>
            <ul>
              <li>
                <label :for="`nome${index}`">Nome do Recipiente:</label>
                <input v-model="recipiente.nome" :id="`nome${index}`" type="text" placeholder="Ex: Latão" />
              </li>
              <li>
                <label :for="`volume${index}`">Volume (ml):</label>
                <input v-model.number="recipiente.volume" :id="`volume${index}`" type="number" placeholder="Ex: 473" />
              </li>
              <li>
                <label :for="`preco${index}`">Preço (R$):</label>
                <input v-model.number="recipiente.preco" :id="`preco${index}`" type="number" step="0.01" placeholder="Ex: 5.50" />
              </li>
            </ul>
            
            <template  v-if="index !== 0">
              <button aria-label="Remover recipiente" class="btn-remove" @click.prevent="removerRecipiente(index)">
                &times;
              </button>
            </template>
          </fieldset>

          <fieldset>
            <button class="btn" @click="adicionarRecipiente" type="button">Adicionar Recipiente</button>
          </fieldset>
          
          <button class="btn" @click="compararPrecos" type="button">Comparar</button>
        </form>

        <!-- Modal para exibir o resultado -->
        <Modal :isVisible="mostrarModal" @close="fecharModal">
          <div v-if="resultado">
            <p><mark>{{ resultado.mensagem }}</mark></p>
            <ul>
              <li v-for="(item, index) in resultado.detalhes" :key="index">
                <mark>{{ item.nome }}: R$ {{ item.precoPorLitro.toFixed(2) }} por Litro.</mark>
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    </main>
  </div>
</template>


<script>
import Modal from './Components/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      recipientes: [
        { nome: '', volume: null, preco: null },
        { nome: '', volume: null, preco: null }
      ],
      resultado: null,
      mostrarModal: false
    };
  },
  methods: {
    calcularPrecoPorLitro(preco, volumeMl) {
      const volumeLitros = volumeMl / 1000; // Converte ml para litros
      return preco / volumeLitros;
    },
    compararPrecos() {
      let maisBarato = null;
      const detalhes = [];

      this.recipientes.forEach((recipiente) => {
        if (recipiente.volume > 0 && recipiente.preco > 0) {
          const precoPorLitro = this.calcularPrecoPorLitro(recipiente.preco, recipiente.volume);
          recipiente.precoPorLitro = precoPorLitro;
          detalhes.push({ nome: recipiente.nome, precoPorLitro });

          if (!maisBarato || precoPorLitro < maisBarato.precoPorLitro) {
            maisBarato = recipiente;
          }
        }
      });

      if (maisBarato) {
        this.resultado = {
          mensagem: `${maisBarato.nome} é mais barato. O preço por litro do ${maisBarato.nome} é R$ ${maisBarato.precoPorLitro.toFixed(2)}.`,
          detalhes
        };
        this.mostrarModal = true;
      } else {
        this.resultado = 'Por favor, preencha todos os campos corretamente.';
      }
    },
    adicionarRecipiente() {
      this.recipientes.push({ nome: '', volume: null, preco: null });
    },
    removerRecipiente(index) {
      this.recipientes.splice(index, 1);
    },
    fecharModal() {
      this.mostrarModal = false;
    }
  }
};
</script>



<style lang="scss">
body {
  background-color: var(--dark);
}
.header {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 15px;
}

.page-title {
  color: var(--primary-color);
  margin: 0;
  font-family: var(--title-font);
  text-transform: uppercase;
  font-size: 60px;
}

.page-desc {
  color: var(--light);
  margin: 0;
  font-size: 18px;
}

.main {
  margin: 0 auto 30px;
  max-width: 600px;

  .content {
    border-radius: 3px;
    border: 1px solid #fff;
    min-height: 300px;
    padding: 15px;
    margin: 0 15px;
  }
}

button {
  margin: 10px;
}

fieldset {
  border: 0 none;
  background-color: #262425;
  margin-bottom: 20px;
  border-radius: 3px;
  padding: 12px 10px;
  position: relative;
}

legend {
  background-color: var(--primary-color);
  font-family: var(--title-font);
  text-transform: uppercase;
  color: var(--dark);
  padding: 5px 10px;
  margin-bottom: 20px;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--light);

  li {
    margin-bottom: 15px;
  }

  label {
    display: block;
    cursor: pointer;
    margin-bottom: 3px;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    background-color: #ecece3;
    border: 0 none;
    border-radius: 2px;
  }
}

.resultado {
  background-color: var(--primary-color);
  padding: 15px;
}

.btn {
  background-color: var(--primary-color);
  color: var(--dark);
  text-transform: uppercase;
  border: 0 none;
  font-family: var(--title-font);
  padding: 10px 20px;
  font-size: 16px;
  line-height: 13px;
  cursor: pointer;
  box-sizing: border-box;
}

.btn-remove {
  background-color: var(--primary-color);
  height: 23px;
  position: absolute;
  border-radius: 50%;
  top: -42px;
  right: -8px;
  cursor: pointer;
  border: 0 none;
  margin: 0;
  padding: 0 4px;
  font-size: 22px;
}
</style>

