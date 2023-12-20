import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from './Anuncie.module.scss';
import Button from "components/Button";
import { useForm } from 'react-hook-form';
import { cadastrarItem } from "store/reducers/itens";
import { useParams } from 'react-router-dom';
import Input from "components/Input";

export default function Anuncie() {
    const dispatch = useDispatch();
    const { nomeCategoria = '' } = useParams();
    const categorias = useSelector(state => state.categorias.map(({ nome, id }) => ({ nome, id })));
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            nome: '',
            categoria: nomeCategoria,
            descricao: '',
            url: '',
            preco: ''
        }
    });

    const { errors } = formState;

    function cadastrar(data) {
        dispatch(cadastrarItem(data));
    }

    return (
        <div className={styles.container}>
            <Header titulo='Anuncie aqui'
                descricao='Anuncie seu produto no melhor site do Bostil' />

            <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>

                <Input placeholder='Nome do produto' alt='Nome do produto'
                    {...register('nome', { required: 'O campo nome é obrigatório' })}
                    className={errors.nome ? styles['input-erro'] : ''} />
                {errors.nome && <span className={styles['mensagem-erro']}> {errors.nome.message} </span>}


                <Input placeholder='Descrição do produto' alt='Descrição do produto'
                    {...register('descricao', { required: 'O campo descrição é obrigatório' })}
                    className={errors.descricao ? styles['input-erro'] : ''} />
                {errors.nome && <span className={styles['mensagem-erro']}> {errors.descricao.message} </span>}

                <Input placeholder='Url da imagem do produto' alt='Url da imagem do produto'
                    {...register('imagem', { required: 'O campo imagem é obrigatório' })}
                    className={errors.imagem ? styles['input-erro'] : ''} />
                {errors.nome && <span className={styles['mensagem-erro']}> {errors.imagem.message} </span>}

                <select {...register('categoria', { required: 'Você deve selecionar uma categoria' })}
                    disabled={nomeCategoria}
                    className={errors.categoria ? styles['input-erro'] : ''}>
                    <option value='' disabled>Selecione a categoria</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
                {errors.nome && <span className={styles['mensagem-erro']}> {errors.nome.message} </span>}

                <Input type='number' placeholder='Preço do produto'
                    {...register('preco', { required: 'O campo preço é obrigatório', valueAsNumber: true })}
                    className={errors.preco ? styles['input-erro'] : ''} />
                {errors.nome && <span className={styles['mensagem-erro']}> {errors.nome.message} </span>}

                <Button type='submit'>
                    Cadastrar produto
                </Button>
            </form>
        </div>
    )
}